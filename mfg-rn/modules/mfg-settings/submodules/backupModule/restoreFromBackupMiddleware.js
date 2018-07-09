/* eslint-disable */
// @flow

/*
import pako from 'pako';
// import RNFS from 'react-native-fs';
import {
  Alert,
} from 'react-native';
import {
  NavigationActions,
} from 'react-navigation';
// import { DocumentPicker } from 'react-native-document-picker';
import { reportException } from '../../reportError';
import type { MyStore, MyDispatch, AnyAction } from '../../global.flow';
import {
  restartAppAC,
  LIVE_ACCOUNT_DATA_ARRIVED, setFirebaseAccountData,
} from '../core/actionCreators';
import {
  RESTORE_ACCOUNT_FROM_BACKUP_BP, RESTORE_FROM_BACKUP_FAILURE, restoreFromBackupFailure,
  restoreFromBackupSettingDataToFirebase,
  restoreFromBackupSettingDataToFirebaseDone,
  restoreFromBackupStart,
} from './actionCreators';

const restoreFromBackupMiddleware = (store: MyStore) => (next: MyDispatch) => (action: AnyAction) => {
  /!* if (action.type === SET_ACCOUNT_DATA) {
    const state = store.getState();

    if (state.restoreFromBackup.status === 'importing_to_firebase') {
      store.dispatch(restoreFromBackupSettingDataToFirebaseDone());
      Alert.alert('Import complete', 'Your data restored successfully. App will be restarted.', [
        { text: 'OK', onPress: () => store.dispatch(restartAppAC()) },
      ]);
    }
  }

  if (action.type === RESTORE_FROM_BACKUP_FAILURE) {
    Alert.alert('Error', 'Restore failed.');
    store.dispatch(NavigationActions.back());
  }

  if (action.type === RESTORE_ACCOUNT_FROM_BACKUP_BP) {
    DocumentPicker.show({
      filetype: ['org.gnu.gnu-zip-archive'], // todo will not work on android
    }, (error, url) => {
      try {
        store.dispatch(navigateAC({ routeName: 'RestoreFromBackup' }));
        store.dispatch(restoreFromBackupStart());

        RNFS.readFile(url.uri, 'utf8').then((fileContent) => {
          const account = JSON.parse(pako.inflate(fileContent, { to: 'string' }));
          try {
            store.dispatch(restoreFromBackupSettingDataToFirebase());
            setTimeout(() => {
              store.dispatch(setFirebaseAccountData(account, true));
            });
          } catch (e) {
            console.log('RESTORE_FROM_BACKUP_ERROR while parsing file content: ', e);
            reportException(e);
            store.dispatch(restoreFromBackupFailure());
          }
        }).catch(e => {
          console.log('RESTORE_FROM_BACKUP_ERROR while reading file: ', url.uri, e);
          reportException(e);
          store.dispatch(restoreFromBackupFailure());
        });
      } catch (e) {
        console.log('RESTORE_FROM_BACKUP_ERROR while reading file: ', url.uri, e);
        reportException(e);
        store.dispatch(restoreFromBackupFailure());
      }
    });
  }*!/

  return next(action);
};

export {
  restoreFromBackupMiddleware,
}
*/
