/* @flow */

import React from 'react';
import { RN } from '../rn/RN';
import { isEmpty, omit, pick, throttle } from '../utils/utils'
import { RNText, RNView } from './RNUI'

const scrollViewProps = [
  'autoHideHeader',
  'style',
  'data',
  'loading',
  'onLoadMore',
  'onRefresh',
  'getSectionId',
  'renderRow',
  'renderHeader',
  'renderFooter',
  'renderSectionHeader',
  'scrollDriver',
  'onScroll',
];

const Status = {
  LOADING: 'loading',
  LOADING_NEXT: 'loadingNext',
  REFRESHING: 'refreshing',
  IDLE: 'idle',
};

/**
 * Provides dataSource to ListView.
 * Clones items and group them by section if needed.
 */
class ListDataSource {
  constructor(config, getSectionId) {
    /* $FlowFixMe */
    this.getSectionId = getSectionId;
    /* $FlowFixMe */
    this.withSections = !!config.sectionHeaderHasChanged;
    /* $FlowFixMe */
    this.dataSource = new RN.ListView.DataSource(config);
  }

  /**
   * Transforms items list ([...items]) to [[...sectionItems], [...sectionItems]]
   * @param data
   * @returns {*}
   */
  groupItemsIntoSections(data) {
    let prevSectionId;
    return data.reduce((sections, item) => {
      /* $FlowFixMe */
      const sectionId = this.getSectionId(item);
      if (prevSectionId !== sectionId) {
        prevSectionId = sectionId;
        sections.push([]);
      }
      const lastSectionIndex = sections.length - 1;
      sections[lastSectionIndex].push(item);
      return sections;
    }, []);
  }

  /**
   * Transforms items list [<item>, <item>]
   * @param data
   * @returns {*}
   */
  clone(data) {
    /* $FlowFixMe */
    if (this.withSections) {
      /* $FlowFixMe */
      return this.dataSource.cloneWithRowsAndSections(this.groupItemsIntoSections(data));
    }
    /* $FlowFixMe */
    return this.dataSource.cloneWithRows(data);
  }
}

const bySyncScrollIdRefs = {}

class ListView extends React.Component<any, any> {
  constructor(props: any, context: any) {
    super(props, context);
    /* $FlowFixMe */
    this.handleListViewRef = this.handleListViewRef.bind(this);
    /* $FlowFixMe */
    this.renderFooter = this.renderFooter.bind(this);
    /* $FlowFixMe */
    this.autoHideHeader = this.autoHideHeader.bind(this);
    /* $FlowFixMe */
    this.onRefresh = this.onRefresh.bind(this);
    /* $FlowFixMe */
    this.renderRefreshControl = this.renderRefreshControl.bind(this);
    /* $FlowFixMe */
    this.listView = null;

    /* $FlowFixMe */
    this.listDataSource = new ListDataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged: props.renderSectionHeader ? (s1, s2) => s1 !== s2 : undefined,
      getSectionHeaderData: (dataBlob, sectionId) => props.getSectionId(dataBlob[sectionId][0]),
    }, props.getSectionId);


    this.state = {
      status: props.loading ? Status.LOADING : Status.IDLE,
      dataSource: this.listDataSource.clone(props.data),
      scroll: 0,
    };

    if (this.props.syncScrollId) {
      if (!bySyncScrollIdRefs[this.props.syncScrollId]) {
        bySyncScrollIdRefs[this.props.syncScrollId] = []
      }

      bySyncScrollIdRefs[this.props.syncScrollId].push(this)
    }
  }

  componentWillReceiveProps(nextProps: any) {
    if (nextProps.data !== this.props.data) {
      /* $FlowFixMe */
      this.setState({ dataSource: this.listDataSource.clone(nextProps.data) });
    }

    if (nextProps.loading !== this.props.loading) {
      this.setLoading(nextProps.loading);
    }
  }

  /* $FlowFixMe */
  shouldComponentUpdate(nextProps, nextState) {
    return (nextProps.data !== this.props.data) ||
      (nextProps.loading !== this.props.loading) ||
      (nextState.status !== this.state.status);
  }

  componentWillUnmount() {
    if ((RN.Platform.OS === 'ios') && (this.state.status !== Status.IDLE)) {
      // Reset the global network indicator state
      RN.StatusBar.setNetworkActivityIndicatorVisible(false);
    }
  }

  onRefresh() {
    this.setState({
      status: Status.REFRESHING,
    });

    if (this.props.onRefresh) {
      this.props.onRefresh();
    }
  }

  /**
   * Used to map props we are passing to React Native ListView.
   * Setting default values.
   * @returns {{}}
   */
  getPropsToPass() {
    const props = this.props;
    const mappedProps = omit(['style'], pick(scrollViewProps, props));

    // configuration
    // default load more threshold
    mappedProps.onEndReachedThreshold = 40;
    // React native warning
    // NOTE: In react 0.23 it can't be set to false
    mappedProps.enableEmptySections = true;

    // rendering
    mappedProps.renderHeader = this.createRenderHeader(props.renderHeader, props.autoHideHeader);
    mappedProps.renderRow = props.renderRow;
    mappedProps.renderFooter = this.renderFooter;
    mappedProps.renderSectionHeader = props.renderSectionHeader;

    // events
    mappedProps.onEndReached = this.createOnLoadMore();

    // data to display
    mappedProps.dataSource = this.state.dataSource;

    // refresh control
    mappedProps.refreshControl = props.onRefresh && this.renderRefreshControl();

    // reference
    mappedProps.ref = this.handleListViewRef;

    if (props.syncScrollId) {
      mappedProps.onScroll = (e) => {
        const listViewsToSync = bySyncScrollIdRefs[props.syncScrollId]
        listViewsToSync.forEach(listViewToSync => {
          if (listViewToSync !== this) {
            listViewToSync.scrollListView({ y: e.nativeEvent.contentOffset.y, animated: false })
          }
        })
      }
    }

    return mappedProps;
  }

  /* $FlowFixMe */
  setLoading(loading) {
    if (loading) {
      if (this.state.status !== Status.IDLE) {
        // We are already in a loading status
        return;
      }

      this.setState({
        status: Status.LOADING,
      });
    } else {
      this.setState({
        status: Status.IDLE,
      });
    }
  }

  // eslint-disable-next-line consistent-return
  createOnLoadMore() {
    const { onLoadMore, data } = this.props;
    const { status } = this.state;
    if (onLoadMore) {
      return throttle(() => {
        if (!isEmpty(data) && status === Status.IDLE) {
          onLoadMore();
        }
      }, 2000, { leading: true });
    }
  }

  /* $FlowFixMe */
  autoHideHeader({ nativeEvent: { layout: { height } } }) {
    this.scrollListView({ y: height, animated: false });
  }

  /* $FlowFixMe */
  createRenderHeader(renderHeader, autoHideHeader) {
    if (!renderHeader) {
      return;
    }

    const { style } = this.props;
    const headerContainerProps = {
      style: style.headerContainer,
    };

    if (autoHideHeader) {
      /* $FlowFixMe */
      headerContainerProps.onLayout = this.autoHideHeader;
    }

    // eslint-disable-next-line consistent-return
    return () => (
      <RNView {...headerContainerProps}>{renderHeader()}</RNView >
    );
  }

  /* $FlowFixMe */
  scrollListView(scrollOptions) {
    /* $FlowFixMe */
    this.listView.scrollTo(scrollOptions);
  }

  /**
   * Save RN ListView ref
   * @param listView React native ListView ref
   */
  /* $FlowFixMe */
  handleListViewRef(listView) {
    if (!listView) {
      return;
    }

    /* $FlowFixMe */
    this.listView = listView;
  }

  renderFooter() {
    const { style, renderFooter } = this.props;
    const { status } = this.state;
    let spinner;

    let showNetworkActivity = true;
    switch (status) {
      case Status.LOADING:
        spinner = <RNView style={style.loadMoreSpinner} ><RNText>Loading</RNText></RNView >;
        break;
      case Status.LOADING_NEXT:
        spinner = <RNView style={style.loadMoreSpinner} ><RNText>Loading next</RNText></RNView >;
        break;
      case Status.REFRESHING:
        spinner = null;
        break;
      default:
        showNetworkActivity = false;
        spinner = null;
    }

    if (RN.Platform.OS === 'ios') {
      RN.StatusBar.setNetworkActivityIndicatorVisible(showNetworkActivity);
    }

    return (
      <RNView >
        {spinner}
        {renderFooter ? renderFooter() : null}
      </RNView >
    );
  }

  renderRefreshControl() {
    const { style } = this.props;
    const { status } = this.state;

    return (
      <RN.RefreshControl
        onRefresh={this.onRefresh}
        refreshing={status === Status.REFRESHING}
        tintColor={style.refreshControl.tintColor}
      />
    );
  }

  render() {
    return <RN.ListView {...this.getPropsToPass()} />;
  }
}

export { ListView }
