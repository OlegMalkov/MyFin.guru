/* @flow */

import type { CurrencyCode } from '../../const'

export type CountryCode = 'AC'
  | 'C0'
  | 'AD'
  | 'AE'
  | 'AF'
  | 'AG'
  | 'AI'
  | 'AL'
  | 'AM'
  | 'AN'
  | 'AO'
  | 'AQ'
  | 'AR'
  | 'AS'
  | 'AT'
  | 'AU'
  | 'AW'
  | 'AX'
  | 'AZ'
  | 'BA'
  | 'BB'
  | 'BD'
  | 'BE'
  | 'BF'
  | 'BG'
  | 'BH'
  | 'BI'
  | 'BJ'
  | 'BL'
  | 'BM'
  | 'BN'
  | 'BO'
  | 'BQ'
  | 'BR'
  | 'BS'
  | 'BT'
  | 'BU'
  | 'BV'
  | 'BW'
  | 'BY'
  | 'BZ'
  | 'CA'
  | 'CC'
  | 'CD'
  | 'CF'
  | 'CG'
  | 'CH'
  | 'CI'
  | 'CK'
  | 'CL'
  | 'CM'
  | 'CN'
  | 'CO'
  | 'CP'
  | 'CR'
  | 'CS'
  | 'CT'
  | 'CU'
  | 'C2'
  | 'CV'
  | 'CW'
  | 'CX'
  | 'CY'
  | 'CZ'
  | 'DD'
  | 'DE'
  | 'DG'
  | 'DJ'
  | 'DK'
  | 'DM'
  | 'DO'
  | 'DY'
  | 'DZ'
  | 'EA'
  | 'EC'
  | 'EE'
  | 'EG'
  | 'EH'
  | 'ER'
  | 'ES'
  | 'ET'
  | 'EU'
  | 'FI'
  | 'FJ'
  | 'FK'
  | 'FM'
  | 'FO'
  | 'FQ'
  | 'FR'
  | 'FX'
  | 'GA'
  | 'GB'
  | 'GD'
  | 'GE'
  | 'GF'
  | 'GG'
  | 'GH'
  | 'GI'
  | 'GL'
  | 'GM'
  | 'GN'
  | 'GP'
  | 'GQ'
  | 'GR'
  | 'GS'
  | 'GT'
  | 'GU'
  | 'GW'
  | 'GY'
  | 'HK'
  | 'HM'
  | 'HN'
  | 'HR'
  | 'HT'
  | 'HU'
  | 'HV'
  | 'IC'
  | 'ID'
  | 'IE'
  | 'IL'
  | 'IM'
  | 'IN'
  | 'IO'
  | 'IQ'
  | 'IR'
  | 'IS'
  | 'IT'
  | 'JE'
  | 'JM'
  | 'JO'
  | 'JP'
  | 'JT'
  | 'KE'
  | 'KG'
  | 'KH'
  | 'KI'
  | 'KM'
  | 'KN'
  | 'KP'
  | 'KR'
  | 'KW'
  | 'KY'
  | 'KZ'
  | 'LA'
  | 'LB'
  | 'LC'
  | 'LI'
  | 'LK'
  | 'LR'
  | 'LS'
  | 'LT'
  | 'LU'
  | 'LV'
  | 'LY'
  | 'MA'
  | 'MC'
  | 'MD'
  | 'ME'
  | 'MF'
  | 'MG'
  | 'MH'
  | 'MI'
  | 'MK'
  | 'ML'
  | 'MM'
  | 'MN'
  | 'MO'
  | 'MP'
  | 'MQ'
  | 'MR'
  | 'MS'
  | 'MT'
  | 'MU'
  | 'MV'
  | 'MW'
  | 'MX'
  | 'MY'
  | 'MZ'
  | 'NA'
  | 'NC'
  | 'NE'
  | 'NF'
  | 'NG'
  | 'NH'
  | 'NI'
  | 'NL'
  | 'NO'
  | 'NP'
  | 'NQ'
  | 'NR'
  | 'NT'
  | 'NU'
  | 'NZ'
  | 'OM'
  | 'PA'
  | 'PC'
  | 'PE'
  | 'PF'
  | 'PG'
  | 'PH'
  | 'PK'
  | 'PL'
  | 'PM'
  | 'PN'
  | 'PR'
  | 'PS'
  | 'PT'
  | 'PU'
  | 'PW'
  | 'PY'
  | 'PZ'
  | 'QA'
  | 'RE'
  | 'RH'
  | 'RO'
  | 'RS'
  | 'RU'
  | 'RW'
  | 'SA'
  | 'SB'
  | 'SC'
  | 'SD'
  | 'SE'
  | 'SG'
  | 'SH'
  | 'SI'
  | 'SJ'
  | 'SK'
  | 'SL'
  | 'SM'
  | 'SN'
  | 'SO'
  | 'SR'
  | 'SS'
  | 'ST'
  | 'SU'
  | 'SV'
  | 'SX'
  | 'SY'
  | 'SZ'
  | 'TA'
  | 'TC'
  | 'TD'
  | 'TF'
  | 'TG'
  | 'TH'
  | 'TJ'
  | 'TK'
  | 'TL'
  | 'TM'
  | 'TN'
  | 'TO'
  | 'TP'
  | 'TR'
  | 'TT'
  | 'TV'
  | 'TW'
  | 'TZ'
  | 'UA'
  | 'UG'
  | 'UK'
  | 'UM'
  | 'US'
  | 'UY'
  | 'UZ'
  | 'VA'
  | 'VC'
  | 'VD'
  | 'VE'
  | 'VG'
  | 'VI'
  | 'VN'
  | 'VU'
  | 'WF'
  | 'WK'
  | 'WS'
  | 'XK'
  | 'YD'
  | 'YE'
  | 'YT'
  | 'YU'
  | 'ZA'
  | 'ZM'
  | 'ZR'
  | 'ZW'

export type LanguageCode =
  'eng'
  | 'cat'
  | 'ara'
  | 'pus'
  | 'sqi'
  | 'hye'
  | 'rus'
  | 'por'
  | 'spa'
  | 'smo'
  | 'deu'
  | 'nld'
  | 'swe'
  | 'aze'
  | 'bos'
  | 'cre'
  | 'srp'
  | 'ben'
  | 'fra'
  | 'bul'
  | 'msa'
  | 'aym'
  | 'que'
  | 'dzo'
  | 'tsn'
  | 'bel'
  | 'lin'
  | 'kon'
  | 'swa'
  | 'sag'
  | 'ita'
  | 'roh'
  | 'mri'
  | 'zho'
  | 'ell'
  | 'tur'
  | 'ces'
  | 'dan'
  | 'est'
  | 'tir'
  | 'amh'
  | 'fin'
  | 'fij'
  | 'fao'
  | 'cor'
  | 'gle'
  | 'gla'
  | 'cym'
  | 'kat'
  | 'kal'
  | 'hrv'
  | 'hat'
  | 'hun'
  | 'ind'
  | 'heb'
  | 'glv'
  | 'hin'
  | 'kur'
  | 'fas'
  | 'isl'
  | 'jpn'
  | 'khm'
  | 'kor'
  | 'kaz'
  | 'lao'
  | 'sin'
  | 'tam'
  | 'sot'
  | 'lit'
  | 'ltz'
  | 'lav'
  | 'ron'
  | 'mot'
  | 'mlg'
  | 'mah'
  | 'mkd'
  | 'mya'
  | 'mon'
  | 'mlt'
  | 'div'
  | 'nya'
  | 'nor'
  | 'nep'
  | 'nau'
  | 'urd'
  | 'pol'
  | 'kin'
  | 'slv'
  | 'slk'
  | 'som'
  | 'ssw'
  | 'tha'
  | 'tgk'
  | 'tuk'
  | 'ukr'
  | 'uzb'
  | 'vie'
  | 'bis'
  | 'rom'
  | 'afr'
  | 'nbl'
  | 'tso'
  | 'ven'
  | 'xho'
  | 'zul'
  | 'sna'
  | 'nde'

type CountryReference = {
  'alpha2': CountryCode,
  'alpha3': string,
  'countryCallingCodes': Array<string>,
  'currencies': Array<CurrencyCode>,
  'emoji'?: string,
  'ioc': string,
  'languages': Array<LanguageCode>,
  'name': string,
  'status': 'assigned' | 'user assigned'
}

const countryReferenceMap: { [key: CountryCode]: CountryReference } = {
  'AD': {
    'alpha2': 'AD',
    'alpha3': 'AND',
    'countryCallingCodes': ['+376'],
    'currencies': ['EUR'],
    'emoji': '🇦🇩',
    'ioc': 'AND',
    'languages': ['cat'],
    'name': 'Andorra',
    'status': 'assigned',
  },
  'AE': {
    'alpha2': 'AE',
    'alpha3': 'ARE',
    'countryCallingCodes': ['+971'],
    'currencies': ['AED'],
    'emoji': '🇦🇪',
    'ioc': 'UAE',
    'languages': ['ara'],
    'name': 'United Arab Emirates',
    'status': 'assigned',
  },
  'AF': {
    'alpha2': 'AF',
    'alpha3': 'AFG',
    'countryCallingCodes': ['+93'],
    'currencies': ['AFN'],
    'emoji': '🇦🇫',
    'ioc': 'AFG',
    'languages': ['pus'],
    'name': 'Afghanistan',
    'status': 'assigned',
  },
  'AG': {
    'alpha2': 'AG',
    'alpha3': 'ATG',
    'countryCallingCodes': ['+1 268'],
    'currencies': ['XCD'],
    'emoji': '🇦🇬',
    'ioc': 'ANT',
    'languages': ['eng'],
    'name': 'Antigua And Barbuda',
    'status': 'assigned',
  },
  'AL': {
    'alpha2': 'AL',
    'alpha3': 'ALB',
    'countryCallingCodes': ['+355'],
    'currencies': ['ALL'],
    'emoji': '🇦🇱',
    'ioc': 'ALB',
    'languages': ['sqi'],
    'name': 'Albania',
    'status': 'assigned',
  },
  'AM': {
    'alpha2': 'AM',
    'alpha3': 'ARM',
    'countryCallingCodes': ['+374'],
    'currencies': ['AMD'],
    'emoji': '🇦🇲',
    'ioc': 'ARM',
    'languages': ['hye', 'rus'],
    'name': 'Armenia',
    'status': 'assigned',
  },
  'AO': {
    'alpha2': 'AO',
    'alpha3': 'AGO',
    'countryCallingCodes': ['+244'],
    'currencies': ['AOA'],
    'emoji': '🇦🇴',
    'ioc': 'ANG',
    'languages': ['por'],
    'name': 'Angola',
    'status': 'assigned',
  },
  'AR': {
    'alpha2': 'AR',
    'alpha3': 'ARG',
    'countryCallingCodes': ['+54'],
    'currencies': ['ARS'],
    'emoji': '🇦🇷',
    'ioc': 'ARG',
    'languages': ['spa'],
    'name': 'Argentina',
    'status': 'assigned',
  },
  'AS': {
    'alpha2': 'AS',
    'alpha3': 'ASM',
    'countryCallingCodes': ['+1 684'],
    'currencies': ['USD'],
    'emoji': '🇦🇸',
    'ioc': 'ASA',
    'languages': ['eng', 'smo'],
    'name': 'American Samoa',
    'status': 'assigned',
  },
  'AT': {
    'alpha2': 'AT',
    'alpha3': 'AUT',
    'countryCallingCodes': ['+43'],
    'currencies': ['EUR'],
    'emoji': '🇦🇹',
    'ioc': 'AUT',
    'languages': ['deu'],
    'name': 'Austria',
    'status': 'assigned',
  },
  'AU': {
    'alpha2': 'AU',
    'alpha3': 'AUS',
    'countryCallingCodes': ['+61'],
    'currencies': ['AUD'],
    'emoji': '🇦🇺',
    'ioc': 'AUS',
    'languages': ['eng'],
    'name': 'Australia',
    'status': 'assigned',
  },
  'AW': {
    'alpha2': 'AW',
    'alpha3': 'ABW',
    'countryCallingCodes': ['+297'],
    'currencies': ['AWG'],
    'emoji': '🇦🇼',
    'ioc': 'ARU',
    'languages': ['nld'],
    'name': 'Aruba',
    'status': 'assigned',
  },
  'AX': {
    'alpha2': 'AX',
    'alpha3': 'ALA',
    'countryCallingCodes': ['+358'],
    'currencies': ['EUR'],
    'emoji': '🇦🇽',
    'ioc': '',
    'languages': ['swe'],
    'name': 'Åland Islands',
    'status': 'assigned',
  },
  'AZ': {
    'alpha2': 'AZ',
    'alpha3': 'AZE',
    'countryCallingCodes': ['+994'],
    'currencies': ['AZN'],
    'emoji': '🇦🇿',
    'ioc': 'AZE',
    'languages': ['aze'],
    'name': 'Azerbaijan',
    'status': 'assigned',
  },
  'BA': {
    'alpha2': 'BA',
    'alpha3': 'BIH',
    'countryCallingCodes': ['+387'],
    'currencies': ['BAM'],
    'emoji': '🇧🇦',
    'ioc': 'BIH',
    'languages': ['bos', 'cre', 'srp'],
    'name': 'Bosnia & Herzegovina',
    'status': 'assigned',
  },
  'BB': {
    'alpha2': 'BB',
    'alpha3': 'BRB',
    'countryCallingCodes': ['+1 246'],
    'currencies': ['BBD'],
    'emoji': '🇧🇧',
    'ioc': 'BAR',
    'languages': ['eng'],
    'name': 'Barbados',
    'status': 'assigned',
  },
  'BD': {
    'alpha2': 'BD',
    'alpha3': 'BGD',
    'countryCallingCodes': ['+880'],
    'currencies': ['BDT'],
    'emoji': '🇧🇩',
    'ioc': 'BAN',
    'languages': ['ben'],
    'name': 'Bangladesh',
    'status': 'assigned',
  },
  'BE': {
    'alpha2': 'BE',
    'alpha3': 'BEL',
    'countryCallingCodes': ['+32'],
    'currencies': ['EUR'],
    'emoji': '🇧🇪',
    'ioc': 'BEL',
    'languages': ['nld', 'fra', 'deu'],
    'name': 'Belgium',
    'status': 'assigned',
  },
  'BF': {
    'alpha2': 'BF',
    'alpha3': 'BFA',
    'countryCallingCodes': ['+226'],
    'currencies': ['XOF'],
    'emoji': '🇧🇫',
    'ioc': 'BUR',
    'languages': ['fra'],
    'name': 'Burkina Faso',
    'status': 'assigned',
  },
  'BG': {
    'alpha2': 'BG',
    'alpha3': 'BGR',
    'countryCallingCodes': ['+359'],
    'currencies': ['BGN'],
    'emoji': '🇧🇬',
    'ioc': 'BUL',
    'languages': ['bul'],
    'name': 'Bulgaria',
    'status': 'assigned',
  },
  'BH': {
    'alpha2': 'BH',
    'alpha3': 'BHR',
    'countryCallingCodes': ['+973'],
    'currencies': ['BHD'],
    'emoji': '🇧🇭',
    'ioc': 'BRN',
    'languages': ['ara'],
    'name': 'Bahrain',
    'status': 'assigned',
  },
  'BI': {
    'alpha2': 'BI',
    'alpha3': 'BDI',
    'countryCallingCodes': ['+257'],
    'currencies': ['BIF'],
    'emoji': '🇧🇮',
    'ioc': 'BDI',
    'languages': ['fra'],
    'name': 'Burundi',
    'status': 'assigned',
  },
  'BJ': {
    'alpha2': 'BJ',
    'alpha3': 'BEN',
    'countryCallingCodes': ['+229'],
    'currencies': ['XOF'],
    'emoji': '🇧🇯',
    'ioc': 'BEN',
    'languages': ['fra'],
    'name': 'Benin',
    'status': 'assigned',
  },
  'BL': {
    'alpha2': 'BL',
    'alpha3': 'BLM',
    'countryCallingCodes': ['+590'],
    'currencies': ['EUR'],
    'emoji': '🇧🇱',
    'ioc': '',
    'languages': ['fra'],
    'name': 'Saint Barthélemy',
    'status': 'assigned',
  },
  'BM': {
    'alpha2': 'BM',
    'alpha3': 'BMU',
    'countryCallingCodes': ['+1 441'],
    'currencies': ['BMD'],
    'emoji': '🇧🇲',
    'ioc': 'BER',
    'languages': ['eng'],
    'name': 'Bermuda',
    'status': 'assigned',
  },
  'BN': {
    'alpha2': 'BN',
    'alpha3': 'BRN',
    'countryCallingCodes': ['+673'],
    'currencies': ['BND'],
    'emoji': '🇧🇳',
    'ioc': 'BRU',
    'languages': ['msa', 'eng'],
    'name': 'Brunei Darussalam',
    'status': 'assigned',
  },
  'BO': {
    'alpha2': 'BO',
    'alpha3': 'BOL',
    'countryCallingCodes': ['+591'],
    'currencies': ['BOB'],
    'emoji': '🇧🇴',
    'ioc': 'BOL',
    'languages': ['spa', 'aym', 'que'],
    'name': 'Bolivia, Plurinational State Of',
    'status': 'assigned',
  },
  'BR': {
    'alpha2': 'BR',
    'alpha3': 'BRA',
    'countryCallingCodes': ['+55'],
    'currencies': ['BRL'],
    'emoji': '🇧🇷',
    'ioc': 'BRA',
    'languages': ['por'],
    'name': 'Brazil',
    'status': 'assigned',
  },
  'BS': {
    'alpha2': 'BS',
    'alpha3': 'BHS',
    'countryCallingCodes': ['+1 242'],
    'currencies': ['BSD'],
    'emoji': '🇧🇸',
    'ioc': 'BAH',
    'languages': ['eng'],
    'name': 'Bahamas',
    'status': 'assigned',
  },
  'BT': {
    'alpha2': 'BT',
    'alpha3': 'BTN',
    'countryCallingCodes': ['+975'],
    'currencies': ['BTN'],
    'emoji': '🇧🇹',
    'ioc': 'BHU',
    'languages': ['dzo'],
    'name': 'Bhutan',
    'status': 'assigned',
  },
  'BV': {
    'alpha2': 'BV',
    'alpha3': 'BVT',
    'countryCallingCodes': [],
    'currencies': ['NOK'],
    'emoji': '🇧🇻',
    'ioc': '',
    'languages': [],
    'name': 'Bouvet Island',
    'status': 'assigned',
  },
  'BW': {
    'alpha2': 'BW',
    'alpha3': 'BWA',
    'countryCallingCodes': ['+267'],
    'currencies': ['BWP'],
    'emoji': '🇧🇼',
    'ioc': 'BOT',
    'languages': ['eng', 'tsn'],
    'name': 'Botswana',
    'status': 'assigned',
  },
  'BZ': {
    'alpha2': 'BZ',
    'alpha3': 'BLZ',
    'countryCallingCodes': ['+501'],
    'currencies': ['BZD'],
    'emoji': '🇧🇿',
    'ioc': 'BIZ',
    'languages': ['eng'],
    'name': 'Belize',
    'status': 'assigned',
  },
  'CA': {
    'alpha2': 'CA',
    'alpha3': 'CAN',
    'countryCallingCodes': ['+1'],
    'currencies': ['CAD'],
    'emoji': '🇨🇦',
    'ioc': 'CAN',
    'languages': ['eng', 'fra'],
    'name': 'Canada',
    'status': 'assigned',
  },
  'CC': {
    'alpha2': 'CC',
    'alpha3': 'CCK',
    'countryCallingCodes': ['+61'],
    'currencies': ['AUD'],
    'emoji': '🇨🇨',
    'ioc': '',
    'languages': ['eng'],
    'name': 'Cocos (Keeling) Islands',
    'status': 'assigned',
  },
  'CD': {
    'alpha2': 'CD',
    'alpha3': 'COD',
    'countryCallingCodes': ['+243'],
    'currencies': ['CDF'],
    'emoji': '🇨🇩',
    'ioc': 'COD',
    'languages': ['fra', 'lin', 'kon', 'swa'],
    'name': 'Democratic Republic Of Congo',
    'status': 'assigned',
  },
  'CF': {
    'alpha2': 'CF',
    'alpha3': 'CAF',
    'countryCallingCodes': ['+236'],
    'currencies': ['XAF'],
    'emoji': '🇨🇫',
    'ioc': 'CAF',
    'languages': ['fra', 'sag'],
    'name': 'Central African Republic',
    'status': 'assigned',
  },
  'CG': {
    'alpha2': 'CG',
    'alpha3': 'COG',
    'countryCallingCodes': ['+242'],
    'currencies': ['XAF'],
    'emoji': '🇨🇬',
    'ioc': 'CGO',
    'languages': ['fra', 'lin'],
    'name': 'Republic Of Congo',
    'status': 'assigned',
  },
  'CH': {
    'alpha2': 'CH',
    'alpha3': 'CHE',
    'countryCallingCodes': ['+41'],
    'currencies': ['CHF'],
    'emoji': '🇨🇭',
    'ioc': 'SUI',
    'languages': ['deu', 'fra', 'ita', 'roh'],
    'name': 'Switzerland',
    'status': 'assigned',
  },
  'CI': {
    'alpha2': 'CI',
    'alpha3': 'CIV',
    'countryCallingCodes': ['+225'],
    'currencies': ['XOF'],
    'emoji': '🇨🇮',
    'ioc': 'CIV',
    'languages': ['fra'],
    'name': "Côte d'Ivoire",
    'status': 'assigned',
  },
  'CK': {
    'alpha2': 'CK',
    'alpha3': 'COK',
    'countryCallingCodes': ['+682'],
    'currencies': ['NZD'],
    'emoji': '🇨🇰',
    'ioc': 'COK',
    'languages': ['eng', 'mri'],
    'name': 'Cook Islands',
    'status': 'assigned',
  },
  'CL': {
    'alpha2': 'CL',
    'alpha3': 'CHL',
    'countryCallingCodes': ['+56'],
    'currencies': ['CLP'],
    'emoji': '🇨🇱',
    'ioc': 'CHI',
    'languages': ['spa'],
    'name': 'Chile',
    'status': 'assigned',
  },
  'CM': {
    'alpha2': 'CM',
    'alpha3': 'CMR',
    'countryCallingCodes': ['+237'],
    'currencies': ['XAF'],
    'emoji': '🇨🇲',
    'ioc': 'CMR',
    'languages': ['eng', 'fra'],
    'name': 'Cameroon',
    'status': 'assigned',
  },
  'CN': {
    'alpha2': 'CN',
    'alpha3': 'CHN',
    'countryCallingCodes': ['+86'],
    'currencies': ['CNY'],
    'emoji': '🇨🇳',
    'ioc': 'CHN',
    'languages': ['zho'],
    'name': 'China',
    'status': 'assigned',
  },
  'CO': {
    'alpha2': 'CO',
    'alpha3': 'COL',
    'countryCallingCodes': ['+57'],
    'currencies': ['COP'],
    'emoji': '🇨🇴',
    'ioc': 'COL',
    'languages': ['spa'],
    'name': 'Colombia',
    'status': 'assigned',
  },
  'CR': {
    'alpha2': 'CR',
    'alpha3': 'CRI',
    'countryCallingCodes': ['+506'],
    'currencies': ['CRC'],
    'emoji': '🇨🇷',
    'ioc': 'CRC',
    'languages': ['spa'],
    'name': 'Costa Rica',
    'status': 'assigned',
  },
  'CU': {
    'alpha2': 'CU',
    'alpha3': 'CUB',
    'countryCallingCodes': ['+53'],
    'currencies': ['CUP'],
    'emoji': '🇨🇺',
    'ioc': 'CUB',
    'languages': ['spa'],
    'name': 'Cuba local',
    'status': 'assigned',
  },
  'C2': {
    'alpha2': 'C2',
    'alpha3': 'CUB',
    'countryCallingCodes': ['+53'],
    'currencies': ['CUC'],
    'emoji': '🇨🇺',
    'ioc': 'CUB',
    'languages': ['spa'],
    'name': 'Cuba expat',
    'status': 'assigned',
  },
  'CV': {
    'alpha2': 'CV',
    'alpha3': 'CPV',
    'countryCallingCodes': ['+238'],
    'currencies': ['CVE'],
    'emoji': '🇨🇻',
    'ioc': 'CPV',
    'languages': ['por'],
    'name': 'Cabo Verde',
    'status': 'assigned',
  },
  'CW': {
    'alpha2': 'CW',
    'alpha3': 'CUW',
    'countryCallingCodes': ['+599'],
    'currencies': ['ANG'],
    'emoji': '🇨🇼',
    'ioc': '',
    'languages': ['nld'],
    'name': 'Curacao',
    'status': 'assigned',
  },
  'CX': {
    'alpha2': 'CX',
    'alpha3': 'CXR',
    'countryCallingCodes': ['+61'],
    'currencies': ['AUD'],
    'emoji': '🇨🇽',
    'ioc': '',
    'languages': ['eng'],
    'name': 'Christmas Island',
    'status': 'assigned',
  },
  'CY': {
    'alpha2': 'CY',
    'alpha3': 'CYP',
    'countryCallingCodes': ['+357'],
    'currencies': ['EUR'],
    'emoji': '🇨🇾',
    'ioc': 'CYP',
    'languages': ['ell', 'tur'],
    'name': 'Cyprus',
    'status': 'assigned',
  },
  'CZ': {
    'alpha2': 'CZ',
    'alpha3': 'CZE',
    'countryCallingCodes': ['+420'],
    'currencies': ['CZK'],
    'emoji': '🇨🇿',
    'ioc': 'CZE',
    'languages': ['ces'],
    'name': 'Czech Republic',
    'status': 'assigned',
  },
  'DE': {
    'alpha2': 'DE',
    'alpha3': 'DEU',
    'countryCallingCodes': ['+49'],
    'currencies': ['EUR'],
    'emoji': '🇩🇪',
    'ioc': 'GER',
    'languages': ['deu'],
    'name': 'Germany',
    'status': 'assigned',
  },
  'DJ': {
    'alpha2': 'DJ',
    'alpha3': 'DJI',
    'countryCallingCodes': ['+253'],
    'currencies': ['DJF'],
    'emoji': '🇩🇯',
    'ioc': 'DJI',
    'languages': ['ara', 'fra'],
    'name': 'Djibouti',
    'status': 'assigned',
  },
  'DK': {
    'alpha2': 'DK',
    'alpha3': 'DNK',
    'countryCallingCodes': ['+45'],
    'currencies': ['DKK'],
    'emoji': '🇩🇰',
    'ioc': 'DEN',
    'languages': ['dan'],
    'name': 'Denmark',
    'status': 'assigned',
  },
  'DM': {
    'alpha2': 'DM',
    'alpha3': 'DMA',
    'countryCallingCodes': ['+1 767'],
    'currencies': ['XCD'],
    'emoji': '🇩🇲',
    'ioc': 'DMA',
    'languages': ['eng'],
    'name': 'Dominica',
    'status': 'assigned',
  },
  'DO': {
    'alpha2': 'DO',
    'alpha3': 'DOM',
    'countryCallingCodes': ['+1 809', '+1 829', '+1 849'],
    'currencies': ['DOP'],
    'emoji': '🇩🇴',
    'ioc': 'DOM',
    'languages': ['spa'],
    'name': 'Dominican Republic',
    'status': 'assigned',
  },
  'DZ': {
    'alpha2': 'DZ',
    'alpha3': 'DZA',
    'countryCallingCodes': ['+213'],
    'currencies': ['DZD'],
    'emoji': '🇩🇿',
    'ioc': 'ALG',
    'languages': ['ara'],
    'name': 'Algeria',
    'status': 'assigned',
  },
  'EC': {
    'alpha2': 'EC',
    'alpha3': 'ECU',
    'countryCallingCodes': ['+593'],
    'currencies': ['USD'],
    'emoji': '🇪🇨',
    'ioc': 'ECU',
    'languages': ['spa', 'que'],
    'name': 'Ecuador',
    'status': 'assigned',
  },
  'EE': {
    'alpha2': 'EE',
    'alpha3': 'EST',
    'countryCallingCodes': ['+372'],
    'currencies': ['EUR'],
    'emoji': '🇪🇪',
    'ioc': 'EST',
    'languages': ['est'],
    'name': 'Estonia',
    'status': 'assigned',
  },
  'EG': {
    'alpha2': 'EG',
    'alpha3': 'EGY',
    'countryCallingCodes': ['+20'],
    'currencies': ['EGP'],
    'emoji': '🇪🇬',
    'ioc': 'EGY',
    'languages': ['ara'],
    'name': 'Egypt',
    'status': 'assigned',
  },
  'EH': {
    'alpha2': 'EH',
    'alpha3': 'ESH',
    'countryCallingCodes': ['+212'],
    'currencies': ['MAD'],
    'emoji': '🇪🇭',
    'ioc': '',
    'languages': [],
    'name': 'Western Sahara',
    'status': 'assigned',
  },
  'ER': {
    'alpha2': 'ER',
    'alpha3': 'ERI',
    'countryCallingCodes': ['+291'],
    'currencies': ['ERN'],
    'emoji': '🇪🇷',
    'ioc': 'ERI',
    'languages': ['eng', 'ara', 'tir'],
    'name': 'Eritrea',
    'status': 'assigned',
  },
  'ES': {
    'alpha2': 'ES',
    'alpha3': 'ESP',
    'countryCallingCodes': ['+34'],
    'currencies': ['EUR'],
    'emoji': '🇪🇸',
    'ioc': 'ESP',
    'languages': ['spa'],
    'name': 'Spain',
    'status': 'assigned',
  },
  'ET': {
    'alpha2': 'ET',
    'alpha3': 'ETH',
    'countryCallingCodes': ['+251'],
    'currencies': ['ETB'],
    'emoji': '🇪🇹',
    'ioc': 'ETH',
    'languages': ['amh'],
    'name': 'Ethiopia',
    'status': 'assigned',
  },
  'FI': {
    'alpha2': 'FI',
    'alpha3': 'FIN',
    'countryCallingCodes': ['+358'],
    'currencies': ['EUR'],
    'emoji': '🇫🇮',
    'ioc': 'FIN',
    'languages': ['fin', 'swe'],
    'name': 'Finland',
    'status': 'assigned',
  },
  'FJ': {
    'alpha2': 'FJ',
    'alpha3': 'FJI',
    'countryCallingCodes': ['+679'],
    'currencies': ['FJD'],
    'emoji': '🇫🇯',
    'ioc': 'FIJ',
    'languages': ['eng', 'fij'],
    'name': 'Fiji',
    'status': 'assigned',
  },
  'FK': {
    'alpha2': 'FK',
    'alpha3': 'FLK',
    'countryCallingCodes': ['+500'],
    'currencies': ['FKP'],
    'emoji': '🇫🇰',
    'ioc': '',
    'languages': ['eng'],
    'name': 'Falkland Islands',
    'status': 'assigned',
  },
  'FM': {
    'alpha2': 'FM',
    'alpha3': 'FSM',
    'countryCallingCodes': ['+691'],
    'currencies': ['USD'],
    'emoji': '🇫🇲',
    'ioc': 'FSM',
    'languages': ['eng'],
    'name': 'Micronesia, Federated States Of',
    'status': 'assigned',
  },
  'FO': {
    'alpha2': 'FO',
    'alpha3': 'FRO',
    'countryCallingCodes': ['+298'],
    'currencies': ['DKK'],
    'emoji': '🇫🇴',
    'ioc': 'FAI',
    'languages': ['fao', 'dan'],
    'name': 'Faroe Islands',
    'status': 'assigned',
  },
  'FR': {
    'alpha2': 'FR',
    'alpha3': 'FRA',
    'countryCallingCodes': ['+33'],
    'currencies': ['EUR'],
    'emoji': '🇫🇷',
    'ioc': 'FRA',
    'languages': ['fra'],
    'name': 'France',
    'status': 'assigned',
  },
  'GA': {
    'alpha2': 'GA',
    'alpha3': 'GAB',
    'countryCallingCodes': ['+241'],
    'currencies': ['XAF'],
    'emoji': '🇬🇦',
    'ioc': 'GAB',
    'languages': ['fra'],
    'name': 'Gabon',
    'status': 'assigned',
  },
  'GB': {
    'alpha2': 'GB',
    'alpha3': 'GBR',
    'countryCallingCodes': ['+44'],
    'currencies': ['GBP'],
    'emoji': '🇬🇧',
    'ioc': 'GBR',
    'languages': ['eng', 'cor', 'gle', 'gla', 'cym'],
    'name': 'United Kingdom',
    'status': 'assigned',
  },
  'GD': {
    'alpha2': 'GD',
    'alpha3': 'GRD',
    'countryCallingCodes': ['+473'],
    'currencies': ['XCD'],
    'emoji': '🇬🇩',
    'ioc': 'GRN',
    'languages': ['eng'],
    'name': 'Grenada',
    'status': 'assigned',
  },
  'GF': {
    'alpha2': 'GF',
    'alpha3': 'GUF',
    'countryCallingCodes': ['+594'],
    'currencies': ['EUR'],
    'emoji': '🇬🇫',
    'ioc': '',
    'languages': ['fra'],
    'name': 'French Guiana',
    'status': 'assigned',
  },
  'GG': {
    'alpha2': 'GG',
    'alpha3': 'GGY',
    'countryCallingCodes': ['+44'],
    'currencies': ['GBP'],
    'emoji': '🇬🇬',
    'ioc': 'GCI',
    'languages': ['fra'],
    'name': 'Guernsey',
    'status': 'assigned',
  },
  'GH': {
    'alpha2': 'GH',
    'alpha3': 'GHA',
    'countryCallingCodes': ['+233'],
    'currencies': ['GHS'],
    'emoji': '🇬🇭',
    'ioc': 'GHA',
    'languages': ['eng'],
    'name': 'Ghana',
    'status': 'assigned',
  },
  'GI': {
    'alpha2': 'GI',
    'alpha3': 'GIB',
    'countryCallingCodes': ['+350'],
    'currencies': ['GIP'],
    'emoji': '🇬🇮',
    'ioc': '',
    'languages': ['eng'],
    'name': 'Gibraltar',
    'status': 'assigned',
  },
  'GL': {
    'alpha2': 'GL',
    'alpha3': 'GRL',
    'countryCallingCodes': ['+299'],
    'currencies': ['DKK'],
    'emoji': '🇬🇱',
    'ioc': '',
    'languages': ['kal'],
    'name': 'Greenland',
    'status': 'assigned',
  },
  'GM': {
    'alpha2': 'GM',
    'alpha3': 'GMB',
    'countryCallingCodes': ['+220'],
    'currencies': ['GMD'],
    'emoji': '🇬🇲',
    'ioc': 'GAM',
    'languages': ['eng'],
    'name': 'Gambia',
    'status': 'assigned',
  },
  'GN': {
    'alpha2': 'GN',
    'alpha3': 'GIN',
    'countryCallingCodes': ['+224'],
    'currencies': ['GNF'],
    'emoji': '🇬🇳',
    'ioc': 'GUI',
    'languages': ['fra'],
    'name': 'Guinea',
    'status': 'assigned',
  },
  'GP': {
    'alpha2': 'GP',
    'alpha3': 'GLP',
    'countryCallingCodes': ['+590'],
    'currencies': ['EUR'],
    'emoji': '🇬🇵',
    'ioc': '',
    'languages': ['fra'],
    'name': 'Guadeloupe',
    'status': 'assigned',
  },
  'GQ': {
    'alpha2': 'GQ',
    'alpha3': 'GNQ',
    'countryCallingCodes': ['+240'],
    'currencies': ['XAF'],
    'emoji': '🇬🇶',
    'ioc': 'GEQ',
    'languages': ['spa', 'fra', 'por'],
    'name': 'Equatorial Guinea',
    'status': 'assigned',
  },
  'GR': {
    'alpha2': 'GR',
    'alpha3': 'GRC',
    'countryCallingCodes': ['+30'],
    'currencies': ['EUR'],
    'emoji': '🇬🇷',
    'ioc': 'GRE',
    'languages': ['ell'],
    'name': 'Greece',
    'status': 'assigned',
  },
  'GS': {
    'alpha2': 'GS',
    'alpha3': 'SGS',
    'countryCallingCodes': [],
    'currencies': ['GBP'],
    'emoji': '🇬🇸',
    'ioc': '',
    'languages': ['eng'],
    'name': 'South Georgia And The South Sandwich Islands',
    'status': 'assigned',
  },
  'GT': {
    'alpha2': 'GT',
    'alpha3': 'GTM',
    'countryCallingCodes': ['+502'],
    'currencies': ['GTQ'],
    'emoji': '🇬🇹',
    'ioc': 'GUA',
    'languages': ['spa'],
    'name': 'Guatemala',
    'status': 'assigned',
  },
  'GU': {
    'alpha2': 'GU',
    'alpha3': 'GUM',
    'countryCallingCodes': ['+1 671'],
    'currencies': ['USD'],
    'emoji': '🇬🇺',
    'ioc': 'GUM',
    'languages': ['eng'],
    'name': 'Guam',
    'status': 'assigned',
  },
  'GW': {
    'alpha2': 'GW',
    'alpha3': 'GNB',
    'countryCallingCodes': ['+245'],
    'currencies': ['XOF'],
    'emoji': '🇬🇼',
    'ioc': 'GBS',
    'languages': ['por'],
    'name': 'Guinea-bissau',
    'status': 'assigned',
  },
  'GY': {
    'alpha2': 'GY',
    'alpha3': 'GUY',
    'countryCallingCodes': ['+592'],
    'currencies': ['GYD'],
    'emoji': '🇬🇾',
    'ioc': 'GUY',
    'languages': ['eng'],
    'name': 'Guyana',
    'status': 'assigned',
  },
  'HK': {
    'alpha2': 'HK',
    'alpha3': 'HKG',
    'countryCallingCodes': ['+852'],
    'currencies': ['HKD'],
    'emoji': '🇭🇰',
    'ioc': 'HKG',
    'languages': ['zho', 'eng'],
    'name': 'Hong Kong',
    'status': 'assigned',
  },
  'HM': {
    'alpha2': 'HM',
    'alpha3': 'HMD',
    'countryCallingCodes': [],
    'currencies': ['AUD'],
    'emoji': '🇭🇲',
    'ioc': '',
    'languages': [],
    'name': 'Heard Island And McDonald Islands',
    'status': 'assigned',
  },
  'HN': {
    'alpha2': 'HN',
    'alpha3': 'HND',
    'countryCallingCodes': ['+504'],
    'currencies': ['HNL'],
    'emoji': '🇭🇳',
    'ioc': 'HON',
    'languages': ['spa'],
    'name': 'Honduras',
    'status': 'assigned',
  },
  'HR': {
    'alpha2': 'HR',
    'alpha3': 'HRV',
    'countryCallingCodes': ['+385'],
    'currencies': ['HRK'],
    'emoji': '🇭🇷',
    'ioc': 'CRO',
    'languages': ['hrv'],
    'name': 'Croatia',
    'status': 'assigned',
  },
  'HT': {
    'alpha2': 'HT',
    'alpha3': 'HTI',
    'countryCallingCodes': ['+509'],
    'currencies': ['HTG'],
    'emoji': '🇭🇹',
    'ioc': 'HAI',
    'languages': ['fra', 'hat'],
    'name': 'Haiti',
    'status': 'assigned',
  },
  'HU': {
    'alpha2': 'HU',
    'alpha3': 'HUN',
    'countryCallingCodes': ['+36'],
    'currencies': ['HUF'],
    'emoji': '🇭🇺',
    'ioc': 'HUN',
    'languages': ['hun'],
    'name': 'Hungary',
    'status': 'assigned',
  },
  'ID': {
    'alpha2': 'ID',
    'alpha3': 'IDN',
    'countryCallingCodes': ['+62'],
    'currencies': ['IDR'],
    'emoji': '🇮🇩',
    'ioc': 'INA',
    'languages': ['ind'],
    'name': 'Indonesia',
    'status': 'assigned',
  },
  'IE': {
    'alpha2': 'IE',
    'alpha3': 'IRL',
    'countryCallingCodes': ['+353'],
    'currencies': ['EUR'],
    'emoji': '🇮🇪',
    'ioc': 'IRL',
    'languages': ['eng', 'gle'],
    'name': 'Ireland',
    'status': 'assigned',
  },
  'IL': {
    'alpha2': 'IL',
    'alpha3': 'ISR',
    'countryCallingCodes': ['+972'],
    'currencies': ['ILS'],
    'emoji': '🇮🇱',
    'ioc': 'ISR',
    'languages': ['heb', 'ara', 'eng'],
    'name': 'Israel',
    'status': 'assigned',
  },
  'IM': {
    'alpha2': 'IM',
    'alpha3': 'IMN',
    'countryCallingCodes': ['+44'],
    'currencies': ['GBP'],
    'emoji': '🇮🇲',
    'ioc': '',
    'languages': ['eng', 'glv'],
    'name': 'Isle Of Man',
    'status': 'assigned',
  },
  'IN': {
    'alpha2': 'IN',
    'alpha3': 'IND',
    'countryCallingCodes': ['+91'],
    'currencies': ['INR'],
    'emoji': '🇮🇳',
    'ioc': 'IND',
    'languages': ['eng', 'hin'],
    'name': 'India',
    'status': 'assigned',
  },
  'IO': {
    'alpha2': 'IO',
    'alpha3': 'IOT',
    'countryCallingCodes': ['+246'],
    'currencies': ['USD'],
    'emoji': '🇮🇴',
    'ioc': '',
    'languages': ['eng'],
    'name': 'British Indian Ocean Territory',
    'status': 'assigned',
  },
  'IQ': {
    'alpha2': 'IQ',
    'alpha3': 'IRQ',
    'countryCallingCodes': ['+964'],
    'currencies': ['IQD'],
    'emoji': '🇮🇶',
    'ioc': 'IRQ',
    'languages': ['ara', 'kur'],
    'name': 'Iraq',
    'status': 'assigned',
  },
  'IR': {
    'alpha2': 'IR',
    'alpha3': 'IRN',
    'countryCallingCodes': ['+98'],
    'currencies': ['IRR'],
    'emoji': '🇮🇷',
    'ioc': 'IRI',
    'languages': ['fas'],
    'name': 'Iran, Islamic Republic Of',
    'status': 'assigned',
  },
  'IS': {
    'alpha2': 'IS',
    'alpha3': 'ISL',
    'countryCallingCodes': ['+354'],
    'currencies': ['ISK'],
    'emoji': '🇮🇸',
    'ioc': 'ISL',
    'languages': ['isl'],
    'name': 'Iceland',
    'status': 'assigned',
  },
  'IT': {
    'alpha2': 'IT',
    'alpha3': 'ITA',
    'countryCallingCodes': ['+39'],
    'currencies': ['EUR'],
    'emoji': '🇮🇹',
    'ioc': 'ITA',
    'languages': ['ita'],
    'name': 'Italy',
    'status': 'assigned',
  },
  'JE': {
    'alpha2': 'JE',
    'alpha3': 'JEY',
    'countryCallingCodes': ['+44'],
    'currencies': ['GBP'],
    'emoji': '🇯🇪',
    'ioc': 'JCI',
    'languages': ['eng', 'fra'],
    'name': 'Jersey',
    'status': 'assigned',
  },
  'JM': {
    'alpha2': 'JM',
    'alpha3': 'JAM',
    'countryCallingCodes': ['+1 876'],
    'currencies': ['JMD'],
    'emoji': '🇯🇲',
    'ioc': 'JAM',
    'languages': ['eng'],
    'name': 'Jamaica',
    'status': 'assigned',
  },
  'JO': {
    'alpha2': 'JO',
    'alpha3': 'JOR',
    'countryCallingCodes': ['+962'],
    'currencies': ['JOD'],
    'emoji': '🇯🇴',
    'ioc': 'JOR',
    'languages': ['ara'],
    'name': 'Jordan',
    'status': 'assigned',
  },
  'JP': {
    'alpha2': 'JP',
    'alpha3': 'JPN',
    'countryCallingCodes': ['+81'],
    'currencies': ['JPY'],
    'emoji': '🇯🇵',
    'ioc': 'JPN',
    'languages': ['jpn'],
    'name': 'Japan',
    'status': 'assigned',
  },
  'KE': {
    'alpha2': 'KE',
    'alpha3': 'KEN',
    'countryCallingCodes': ['+254'],
    'currencies': ['KES'],
    'emoji': '🇰🇪',
    'ioc': 'KEN',
    'languages': ['eng', 'swa'],
    'name': 'Kenya',
    'status': 'assigned',
  },
  'KG': {
    'alpha2': 'KG',
    'alpha3': 'KGZ',
    'countryCallingCodes': ['+996'],
    'currencies': ['KGS'],
    'emoji': '🇰🇬',
    'ioc': 'KGZ',
    'languages': ['rus'],
    'name': 'Kyrgyzstan',
    'status': 'assigned',
  },
  'KH': {
    'alpha2': 'KH',
    'alpha3': 'KHM',
    'countryCallingCodes': ['+855'],
    'currencies': ['KHR'],
    'emoji': '🇰🇭',
    'ioc': 'CAM',
    'languages': ['khm'],
    'name': 'Cambodia',
    'status': 'assigned',
  },
  'KI': {
    'alpha2': 'KI',
    'alpha3': 'KIR',
    'countryCallingCodes': ['+686'],
    'currencies': ['AUD'],
    'emoji': '🇰🇮',
    'ioc': 'KIR',
    'languages': ['eng'],
    'name': 'Kiribati',
    'status': 'assigned',
  },
  'KM': {
    'alpha2': 'KM',
    'alpha3': 'COM',
    'countryCallingCodes': ['+269'],
    'currencies': ['KMF'],
    'emoji': '🇰🇲',
    'ioc': 'COM',
    'languages': ['ara', 'fra'],
    'name': 'Comoros',
    'status': 'assigned',
  },
  'KN': {
    'alpha2': 'KN',
    'alpha3': 'KNA',
    'countryCallingCodes': ['+1 869'],
    'currencies': ['XCD'],
    'emoji': '🇰🇳',
    'ioc': 'SKN',
    'languages': ['eng'],
    'name': 'Saint Kitts And Nevis',
    'status': 'assigned',
  },
  'KP': {
    'alpha2': 'KP',
    'alpha3': 'PRK',
    'countryCallingCodes': ['+850'],
    'currencies': ['KPW'],
    'emoji': '🇰🇵',
    'ioc': 'PRK',
    'languages': ['kor'],
    'name': "Korea, Democratic People's Republic Of",
    'status': 'assigned',
  },
  'KR': {
    'alpha2': 'KR',
    'alpha3': 'KOR',
    'countryCallingCodes': ['+82'],
    'currencies': ['KRW'],
    'emoji': '🇰🇷',
    'ioc': 'KOR',
    'languages': ['kor'],
    'name': 'Korea, Republic Of',
    'status': 'assigned',
  },
  'KW': {
    'alpha2': 'KW',
    'alpha3': 'KWT',
    'countryCallingCodes': ['+965'],
    'currencies': ['KWD'],
    'emoji': '🇰🇼',
    'ioc': 'KUW',
    'languages': ['ara'],
    'name': 'Kuwait',
    'status': 'assigned',
  },
  'KY': {
    'alpha2': 'KY',
    'alpha3': 'CYM',
    'countryCallingCodes': ['+1 345'],
    'currencies': ['KYD'],
    'emoji': '🇰🇾',
    'ioc': 'CAY',
    'languages': ['eng'],
    'name': 'Cayman Islands',
    'status': 'assigned',
  },
  'KZ': {
    'alpha2': 'KZ',
    'alpha3': 'KAZ',
    'countryCallingCodes': ['+7', '+7 6', '+7 7'],
    'currencies': ['KZT'],
    'emoji': '🇰🇿',
    'ioc': 'KAZ',
    'languages': ['kaz', 'rus'],
    'name': 'Kazakhstan',
    'status': 'assigned',
  },
  'LA': {
    'alpha2': 'LA',
    'alpha3': 'LAO',
    'countryCallingCodes': ['+856'],
    'currencies': ['LAK'],
    'emoji': '🇱🇦',
    'ioc': 'LAO',
    'languages': ['lao'],
    'name': "Lao People's Democratic Republic",
    'status': 'assigned',
  },
  'LB': {
    'alpha2': 'LB',
    'alpha3': 'LBN',
    'countryCallingCodes': ['+961'],
    'currencies': ['LBP'],
    'emoji': '🇱🇧',
    'ioc': 'LIB',
    'languages': ['ara', 'hye'],
    'name': 'Lebanon',
    'status': 'assigned',
  },
  'LC': {
    'alpha2': 'LC',
    'alpha3': 'LCA',
    'countryCallingCodes': ['+1 758'],
    'currencies': ['XCD'],
    'emoji': '🇱🇨',
    'ioc': 'LCA',
    'languages': ['eng'],
    'name': 'Saint Lucia',
    'status': 'assigned',
  },
  'LI': {
    'alpha2': 'LI',
    'alpha3': 'LIE',
    'countryCallingCodes': ['+423'],
    'currencies': ['CHF'],
    'emoji': '🇱🇮',
    'ioc': 'LIE',
    'languages': ['deu'],
    'name': 'Liechtenstein',
    'status': 'assigned',
  },
  'LK': {
    'alpha2': 'LK',
    'alpha3': 'LKA',
    'countryCallingCodes': ['+94'],
    'currencies': ['LKR'],
    'emoji': '🇱🇰',
    'ioc': 'SRI',
    'languages': ['sin', 'tam'],
    'name': 'Sri Lanka',
    'status': 'assigned',
  },
  'LR': {
    'alpha2': 'LR',
    'alpha3': 'LBR',
    'countryCallingCodes': ['+231'],
    'currencies': ['LRD'],
    'emoji': '🇱🇷',
    'ioc': 'LBR',
    'languages': ['eng'],
    'name': 'Liberia',
    'status': 'assigned',
  },
  'LS': {
    'alpha2': 'LS',
    'alpha3': 'LSO',
    'countryCallingCodes': ['+266'],
    'currencies': ['LSL'],
    'emoji': '🇱🇸',
    'ioc': 'LES',
    'languages': ['eng', 'sot'],
    'name': 'Lesotho',
    'status': 'assigned',
  },
  'LT': {
    'alpha2': 'LT',
    'alpha3': 'LTU',
    'countryCallingCodes': ['+370'],
    'currencies': ['EUR'],
    'emoji': '🇱🇹',
    'ioc': 'LTU',
    'languages': ['lit'],
    'name': 'Lithuania',
    'status': 'assigned',
  },
  'LU': {
    'alpha2': 'LU',
    'alpha3': 'LUX',
    'countryCallingCodes': ['+352'],
    'currencies': ['EUR'],
    'emoji': '🇱🇺',
    'ioc': 'LUX',
    'languages': ['fra', 'deu', 'ltz'],
    'name': 'Luxembourg',
    'status': 'assigned',
  },
  'LV': {
    'alpha2': 'LV',
    'alpha3': 'LVA',
    'countryCallingCodes': ['+371'],
    'currencies': ['EUR'],
    'emoji': '🇱🇻',
    'ioc': 'LAT',
    'languages': ['lav'],
    'name': 'Latvia',
    'status': 'assigned',
  },
  'LY': {
    'alpha2': 'LY',
    'alpha3': 'LBY',
    'countryCallingCodes': ['+218'],
    'currencies': ['LYD'],
    'emoji': '🇱🇾',
    'ioc': 'LBA',
    'languages': ['ara'],
    'name': 'Libya',
    'status': 'assigned',
  },
  'MA': {
    'alpha2': 'MA',
    'alpha3': 'MAR',
    'countryCallingCodes': ['+212'],
    'currencies': ['MAD'],
    'emoji': '🇲🇦',
    'ioc': 'MAR',
    'languages': ['ara'],
    'name': 'Morocco',
    'status': 'assigned',
  },
  'MC': {
    'alpha2': 'MC',
    'alpha3': 'MCO',
    'countryCallingCodes': ['+377'],
    'currencies': ['EUR'],
    'emoji': '🇲🇨',
    'ioc': 'MON',
    'languages': ['fra'],
    'name': 'Monaco',
    'status': 'assigned',
  },
  'MD': {
    'alpha2': 'MD',
    'alpha3': 'MDA',
    'countryCallingCodes': ['+373'],
    'currencies': ['MDL'],
    'emoji': '🇲🇩',
    'ioc': 'MDA',
    'languages': ['ron'],
    'name': 'Moldova',
    'status': 'assigned',
  },
  'ME': {
    'alpha2': 'ME',
    'alpha3': 'MNE',
    'countryCallingCodes': ['+382'],
    'currencies': ['EUR'],
    'emoji': '🇲🇪',
    'ioc': 'MNE',
    'languages': ['mot'],
    'name': 'Montenegro',
    'status': 'assigned',
  },
  'MF': {
    'alpha2': 'MF',
    'alpha3': 'MAF',
    'countryCallingCodes': ['+590'],
    'currencies': ['EUR'],
    'emoji': '🇲🇫',
    'ioc': '',
    'languages': ['fra'],
    'name': 'Saint Martin',
    'status': 'assigned',
  },
  'MG': {
    'alpha2': 'MG',
    'alpha3': 'MDG',
    'countryCallingCodes': ['+261'],
    'currencies': ['MGA'],
    'emoji': '🇲🇬',
    'ioc': 'MAD',
    'languages': ['fra', 'mlg'],
    'name': 'Madagascar',
    'status': 'assigned',
  },
  'MH': {
    'alpha2': 'MH',
    'alpha3': 'MHL',
    'countryCallingCodes': ['+692'],
    'currencies': ['USD'],
    'emoji': '🇲🇭',
    'ioc': 'MHL',
    'languages': ['eng', 'mah'],
    'name': 'Marshall Islands',
    'status': 'assigned',
  },
  'MK': {
    'alpha2': 'MK',
    'alpha3': 'MKD',
    'countryCallingCodes': ['+389'],
    'currencies': ['MKD'],
    'emoji': '🇲🇰',
    'ioc': 'MKD',
    'languages': ['mkd'],
    'name': 'Macedonia, The Former Yugoslav Republic Of',
    'status': 'assigned',
  },
  'ML': {
    'alpha2': 'ML',
    'alpha3': 'MLI',
    'countryCallingCodes': ['+223'],
    'currencies': ['XOF'],
    'emoji': '🇲🇱',
    'ioc': 'MLI',
    'languages': ['fra'],
    'name': 'Mali',
    'status': 'assigned',
  },
  'MM': {
    'alpha2': 'MM',
    'alpha3': 'MMR',
    'countryCallingCodes': ['+95'],
    'currencies': ['MMK'],
    'emoji': '🇲🇲',
    'ioc': 'MYA',
    'languages': ['mya'],
    'name': 'Myanmar',
    'status': 'assigned',
  },
  'MN': {
    'alpha2': 'MN',
    'alpha3': 'MNG',
    'countryCallingCodes': ['+976'],
    'currencies': ['MNT'],
    'emoji': '🇲🇳',
    'ioc': 'MGL',
    'languages': ['mon'],
    'name': 'Mongolia',
    'status': 'assigned',
  },
  'MO': {
    'alpha2': 'MO',
    'alpha3': 'MAC',
    'countryCallingCodes': ['+853'],
    'currencies': ['MOP'],
    'emoji': '🇲🇴',
    'ioc': 'MAC',
    'languages': ['zho', 'por'],
    'name': 'Macao',
    'status': 'assigned',
  },
  'MP': {
    'alpha2': 'MP',
    'alpha3': 'MNP',
    'countryCallingCodes': ['+1 670'],
    'currencies': ['USD'],
    'emoji': '🇲🇵',
    'ioc': '',
    'languages': ['eng'],
    'name': 'Northern Mariana Islands',
    'status': 'assigned',
  },
  'MQ': {
    'alpha2': 'MQ',
    'alpha3': 'MTQ',
    'countryCallingCodes': ['+596'],
    'currencies': ['EUR'],
    'emoji': '🇲🇶',
    'ioc': '',
    'languages': [],
    'name': 'Martinique',
    'status': 'assigned',
  },
  'MR': {
    'alpha2': 'MR',
    'alpha3': 'MRT',
    'countryCallingCodes': ['+222'],
    'currencies': ['MRO'],
    'emoji': '🇲🇷',
    'ioc': 'MTN',
    'languages': ['ara', 'fra'],
    'name': 'Mauritania',
    'status': 'assigned',
  },
  'MS': {
    'alpha2': 'MS',
    'alpha3': 'MSR',
    'countryCallingCodes': ['+1 664'],
    'currencies': ['XCD'],
    'emoji': '🇲🇸',
    'ioc': '',
    'languages': [],
    'name': 'Montserrat',
    'status': 'assigned',
  },
  'MT': {
    'alpha2': 'MT',
    'alpha3': 'MLT',
    'countryCallingCodes': ['+356'],
    'currencies': ['EUR'],
    'emoji': '🇲🇹',
    'ioc': 'MLT',
    'languages': ['mlt', 'eng'],
    'name': 'Malta',
    'status': 'assigned',
  },
  'MU': {
    'alpha2': 'MU',
    'alpha3': 'MUS',
    'countryCallingCodes': ['+230'],
    'currencies': ['MUR'],
    'emoji': '🇲🇺',
    'ioc': 'MRI',
    'languages': ['eng', 'fra'],
    'name': 'Mauritius',
    'status': 'assigned',
  },
  'MV': {
    'alpha2': 'MV',
    'alpha3': 'MDV',
    'countryCallingCodes': ['+960'],
    'currencies': ['MVR'],
    'emoji': '🇲🇻',
    'ioc': 'MDV',
    'languages': ['div'],
    'name': 'Maldives',
    'status': 'assigned',
  },
  'MW': {
    'alpha2': 'MW',
    'alpha3': 'MWI',
    'countryCallingCodes': ['+265'],
    'currencies': ['MWK'],
    'emoji': '🇲🇼',
    'ioc': 'MAW',
    'languages': ['eng', 'nya'],
    'name': 'Malawi',
    'status': 'assigned',
  },
  'MX': {
    'alpha2': 'MX',
    'alpha3': 'MEX',
    'countryCallingCodes': ['+52'],
    'currencies': ['MXN'],
    'emoji': '🇲🇽',
    'ioc': 'MEX',
    'languages': ['spa'],
    'name': 'Mexico',
    'status': 'assigned',
  },
  'MY': {
    'alpha2': 'MY',
    'alpha3': 'MYS',
    'countryCallingCodes': ['+60'],
    'currencies': ['MYR'],
    'emoji': '🇲🇾',
    'ioc': 'MAS',
    'languages': ['msa', 'eng'],
    'name': 'Malaysia',
    'status': 'assigned',
  },
  'MZ': {
    'alpha2': 'MZ',
    'alpha3': 'MOZ',
    'countryCallingCodes': ['+258'],
    'currencies': ['MZN'],
    'emoji': '🇲🇿',
    'ioc': 'MOZ',
    'languages': ['por'],
    'name': 'Mozambique',
    'status': 'assigned',
  },
  'NA': {
    'alpha2': 'NA',
    'alpha3': 'NAM',
    'countryCallingCodes': ['+264'],
    'currencies': ['NAD'],
    'emoji': '🇳🇦',
    'ioc': 'NAM',
    'languages': ['eng'],
    'name': 'Namibia',
    'status': 'assigned',
  },
  'NC': {
    'alpha2': 'NC',
    'alpha3': 'NCL',
    'countryCallingCodes': ['+687'],
    'currencies': ['XPF'],
    'emoji': '🇳🇨',
    'ioc': '',
    'languages': ['fra'],
    'name': 'New Caledonia',
    'status': 'assigned',
  },
  'NE': {
    'alpha2': 'NE',
    'alpha3': 'NER',
    'countryCallingCodes': ['+227'],
    'currencies': ['XOF'],
    'emoji': '🇳🇪',
    'ioc': 'NIG',
    'languages': ['fra'],
    'name': 'Niger',
    'status': 'assigned',
  },
  'NF': {
    'alpha2': 'NF',
    'alpha3': 'NFK',
    'countryCallingCodes': ['+672'],
    'currencies': ['AUD'],
    'emoji': '🇳🇫',
    'ioc': '',
    'languages': ['eng'],
    'name': 'Norfolk Island',
    'status': 'assigned',
  },
  'NG': {
    'alpha2': 'NG',
    'alpha3': 'NGA',
    'countryCallingCodes': ['+234'],
    'currencies': ['NGN'],
    'emoji': '🇳🇬',
    'ioc': 'NGR',
    'languages': ['eng'],
    'name': 'Nigeria',
    'status': 'assigned',
  },
  'NI': {
    'alpha2': 'NI',
    'alpha3': 'NIC',
    'countryCallingCodes': ['+505'],
    'currencies': ['NIO'],
    'emoji': '🇳🇮',
    'ioc': 'NCA',
    'languages': ['spa'],
    'name': 'Nicaragua',
    'status': 'assigned',
  },
  'NL': {
    'alpha2': 'NL',
    'alpha3': 'NLD',
    'countryCallingCodes': ['+31'],
    'currencies': ['EUR'],
    'emoji': '🇳🇱',
    'ioc': 'NED',
    'languages': ['nld'],
    'name': 'Netherlands',
    'status': 'assigned',
  },
  'NO': {
    'alpha2': 'NO',
    'alpha3': 'NOR',
    'countryCallingCodes': ['+47'],
    'currencies': ['NOK'],
    'emoji': '🇳🇴',
    'ioc': 'NOR',
    'languages': ['nor'],
    'name': 'Norway',
    'status': 'assigned',
  },
  'NP': {
    'alpha2': 'NP',
    'alpha3': 'NPL',
    'countryCallingCodes': ['+977'],
    'currencies': ['NPR'],
    'emoji': '🇳🇵',
    'ioc': 'NEP',
    'languages': ['nep'],
    'name': 'Nepal',
    'status': 'assigned',
  },
  'NR': {
    'alpha2': 'NR',
    'alpha3': 'NRU',
    'countryCallingCodes': ['+674'],
    'currencies': ['AUD'],
    'emoji': '🇳🇷',
    'ioc': 'NRU',
    'languages': ['eng', 'nau'],
    'name': 'Nauru',
    'status': 'assigned',
  },
  'NU': {
    'alpha2': 'NU',
    'alpha3': 'NIU',
    'countryCallingCodes': ['+683'],
    'currencies': ['NZD'],
    'emoji': '🇳🇺',
    'ioc': '',
    'languages': ['eng'],
    'name': 'Niue',
    'status': 'assigned',
  },
  'NZ': {
    'alpha2': 'NZ',
    'alpha3': 'NZL',
    'countryCallingCodes': ['+64'],
    'currencies': ['NZD'],
    'emoji': '🇳🇿',
    'ioc': 'NZL',
    'languages': ['eng'],
    'name': 'New Zealand',
    'status': 'assigned',
  },
  'OM': {
    'alpha2': 'OM',
    'alpha3': 'OMN',
    'countryCallingCodes': ['+968'],
    'currencies': ['OMR'],
    'emoji': '🇴🇲',
    'ioc': 'OMA',
    'languages': ['ara'],
    'name': 'Oman',
    'status': 'assigned',
  },
  'PA': {
    'alpha2': 'PA',
    'alpha3': 'PAN',
    'countryCallingCodes': ['+507'],
    'currencies': ['PAB'],
    'emoji': '🇵🇦',
    'ioc': 'PAN',
    'languages': ['spa'],
    'name': 'Panama',
    'status': 'assigned',
  },
  'PE': {
    'alpha2': 'PE',
    'alpha3': 'PER',
    'countryCallingCodes': ['+51'],
    'currencies': ['PEN'],
    'emoji': '🇵🇪',
    'ioc': 'PER',
    'languages': ['spa', 'aym', 'que'],
    'name': 'Peru',
    'status': 'assigned',
  },
  'PF': {
    'alpha2': 'PF',
    'alpha3': 'PYF',
    'countryCallingCodes': ['+689'],
    'currencies': ['XPF'],
    'emoji': '🇵🇫',
    'ioc': '',
    'languages': ['fra'],
    'name': 'French Polynesia',
    'status': 'assigned',
  },
  'PG': {
    'alpha2': 'PG',
    'alpha3': 'PNG',
    'countryCallingCodes': ['+675'],
    'currencies': ['PGK'],
    'emoji': '🇵🇬',
    'ioc': 'PNG',
    'languages': ['eng'],
    'name': 'Papua New Guinea',
    'status': 'assigned',
  },
  'PH': {
    'alpha2': 'PH',
    'alpha3': 'PHL',
    'countryCallingCodes': ['+63'],
    'currencies': ['PHP'],
    'emoji': '🇵🇭',
    'ioc': 'PHI',
    'languages': ['eng'],
    'name': 'Philippines',
    'status': 'assigned',
  },
  'PK': {
    'alpha2': 'PK',
    'alpha3': 'PAK',
    'countryCallingCodes': ['+92'],
    'currencies': ['PKR'],
    'emoji': '🇵🇰',
    'ioc': 'PAK',
    'languages': ['urd', 'eng'],
    'name': 'Pakistan',
    'status': 'assigned',
  },
  'PL': {
    'alpha2': 'PL',
    'alpha3': 'POL',
    'countryCallingCodes': ['+48'],
    'currencies': ['PLN'],
    'emoji': '🇵🇱',
    'ioc': 'POL',
    'languages': ['pol'],
    'name': 'Poland',
    'status': 'assigned',
  },
  'PM': {
    'alpha2': 'PM',
    'alpha3': 'SPM',
    'countryCallingCodes': ['+508'],
    'currencies': ['EUR'],
    'emoji': '🇵🇲',
    'ioc': '',
    'languages': ['eng'],
    'name': 'Saint Pierre And Miquelon',
    'status': 'assigned',
  },
  'PN': {
    'alpha2': 'PN',
    'alpha3': 'PCN',
    'countryCallingCodes': ['+872'],
    'currencies': ['NZD'],
    'emoji': '🇵🇳',
    'ioc': '',
    'languages': ['eng'],
    'name': 'Pitcairn',
    'status': 'assigned',
  },
  'PR': {
    'alpha2': 'PR',
    'alpha3': 'PRI',
    'countryCallingCodes': ['+1 787', '+1 939'],
    'currencies': ['USD'],
    'emoji': '🇵🇷',
    'ioc': 'PUR',
    'languages': ['spa', 'eng'],
    'name': 'Puerto Rico',
    'status': 'assigned',
  },
  'PS': {
    'alpha2': 'PS',
    'alpha3': 'PSE',
    'countryCallingCodes': ['+970'],
    'currencies': ['JOD'],
    'emoji': '🇵🇸',
    'ioc': 'PLE',
    'languages': ['ara'],
    'name': 'Palestinian Territory, Occupied',
    'status': 'assigned',
  },
  'PT': {
    'alpha2': 'PT',
    'alpha3': 'PRT',
    'countryCallingCodes': ['+351'],
    'currencies': ['EUR'],
    'emoji': '🇵🇹',
    'ioc': 'POR',
    'languages': ['por'],
    'name': 'Portugal',
    'status': 'assigned',
  },
  'PW': {
    'alpha2': 'PW',
    'alpha3': 'PLW',
    'countryCallingCodes': ['+680'],
    'currencies': ['USD'],
    'emoji': '🇵🇼',
    'ioc': 'PLW',
    'languages': ['eng'],
    'name': 'Palau',
    'status': 'assigned',
  },
  'PY': {
    'alpha2': 'PY',
    'alpha3': 'PRY',
    'countryCallingCodes': ['+595'],
    'currencies': ['PYG'],
    'emoji': '🇵🇾',
    'ioc': 'PAR',
    'languages': ['spa'],
    'name': 'Paraguay',
    'status': 'assigned',
  },
  'QA': {
    'alpha2': 'QA',
    'alpha3': 'QAT',
    'countryCallingCodes': ['+974'],
    'currencies': ['QAR'],
    'emoji': '🇶🇦',
    'ioc': 'QAT',
    'languages': ['ara'],
    'name': 'Qatar',
    'status': 'assigned',
  },
  'RE': {
    'alpha2': 'RE',
    'alpha3': 'REU',
    'countryCallingCodes': ['+262'],
    'currencies': ['EUR'],
    'emoji': '🇷🇪',
    'ioc': '',
    'languages': ['fra'],
    'name': 'Reunion',
    'status': 'assigned',
  },
  'RO': {
    'alpha2': 'RO',
    'alpha3': 'ROU',
    'countryCallingCodes': ['+40'],
    'currencies': ['RON'],
    'emoji': '🇷🇴',
    'ioc': 'ROU',
    'languages': ['ron'],
    'name': 'Romania',
    'status': 'assigned',
  },
  'RS': {
    'alpha2': 'RS',
    'alpha3': 'SRB',
    'countryCallingCodes': ['+381'],
    'currencies': ['RSD'],
    'emoji': '🇷🇸',
    'ioc': 'SRB',
    'languages': ['srp'],
    'name': 'Serbia',
    'status': 'assigned',
  },
  'RU': {
    'alpha2': 'RU',
    'alpha3': 'RUS',
    'countryCallingCodes': ['+7', '+7 3', '+7 4', '+7 8'],
    'currencies': ['RUB'],
    'emoji': '🇷🇺',
    'ioc': 'RUS',
    'languages': ['rus'],
    'name': 'Russian Federation',
    'status': 'assigned',
  },
  'RW': {
    'alpha2': 'RW',
    'alpha3': 'RWA',
    'countryCallingCodes': ['+250'],
    'currencies': ['RWF'],
    'emoji': '🇷🇼',
    'ioc': 'RWA',
    'languages': ['eng', 'fra', 'kin'],
    'name': 'Rwanda',
    'status': 'assigned',
  },
  'SA': {
    'alpha2': 'SA',
    'alpha3': 'SAU',
    'countryCallingCodes': ['+966'],
    'currencies': ['SAR'],
    'emoji': '🇸🇦',
    'ioc': 'KSA',
    'languages': ['ara'],
    'name': 'Saudi Arabia',
    'status': 'assigned',
  },
  'SB': {
    'alpha2': 'SB',
    'alpha3': 'SLB',
    'countryCallingCodes': ['+677'],
    'currencies': ['SBD'],
    'emoji': '🇸🇧',
    'ioc': 'SOL',
    'languages': ['eng'],
    'name': 'Solomon Islands',
    'status': 'assigned',
  },
  'SC': {
    'alpha2': 'SC',
    'alpha3': 'SYC',
    'countryCallingCodes': ['+248'],
    'currencies': ['SCR'],
    'emoji': '🇸🇨',
    'ioc': 'SEY',
    'languages': ['eng', 'fra'],
    'name': 'Seychelles',
    'status': 'assigned',
  },
  'SD': {
    'alpha2': 'SD',
    'alpha3': 'SDN',
    'countryCallingCodes': ['+249'],
    'currencies': ['SDG'],
    'emoji': '🇸🇩',
    'ioc': 'SUD',
    'languages': ['ara', 'eng'],
    'name': 'Sudan',
    'status': 'assigned',
  },
  'SE': {
    'alpha2': 'SE',
    'alpha3': 'SWE',
    'countryCallingCodes': ['+46'],
    'currencies': ['SEK'],
    'emoji': '🇸🇪',
    'ioc': 'SWE',
    'languages': ['swe'],
    'name': 'Sweden',
    'status': 'assigned',
  },
  'SG': {
    'alpha2': 'SG',
    'alpha3': 'SGP',
    'countryCallingCodes': ['+65'],
    'currencies': ['SGD'],
    'emoji': '🇸🇬',
    'ioc': 'SIN',
    'languages': ['eng', 'zho', 'msa', 'tam'],
    'name': 'Singapore',
    'status': 'assigned',
  },
  'SH': {
    'alpha2': 'SH',
    'alpha3': 'SHN',
    'countryCallingCodes': ['+290'],
    'currencies': ['SHP'],
    'emoji': '🇸🇭',
    'ioc': '',
    'languages': ['eng'],
    'name': 'Saint Helena, Ascension And Tristan Da Cunha',
    'status': 'assigned',
  },
  'SI': {
    'alpha2': 'SI',
    'alpha3': 'SVN',
    'countryCallingCodes': ['+386'],
    'currencies': ['EUR'],
    'emoji': '🇸🇮',
    'ioc': 'SLO',
    'languages': ['slv'],
    'name': 'Slovenia',
    'status': 'assigned',
  },
  'SJ': {
    'alpha2': 'SJ',
    'alpha3': 'SJM',
    'countryCallingCodes': ['+47'],
    'currencies': ['NOK'],
    'emoji': '🇸🇯',
    'ioc': '',
    'languages': [],
    'name': 'Svalbard And Jan Mayen',
    'status': 'assigned',
  },
  'SL': {
    'alpha2': 'SL',
    'alpha3': 'SLE',
    'countryCallingCodes': ['+232'],
    'currencies': ['SLL'],
    'emoji': '🇸🇱',
    'ioc': 'SLE',
    'languages': ['eng'],
    'name': 'Sierra Leone',
    'status': 'assigned',
  },
  'SM': {
    'alpha2': 'SM',
    'alpha3': 'SMR',
    'countryCallingCodes': ['+378'],
    'currencies': ['EUR'],
    'emoji': '🇸🇲',
    'ioc': 'SMR',
    'languages': ['ita'],
    'name': 'San Marino',
    'status': 'assigned',
  },
  'SN': {
    'alpha2': 'SN',
    'alpha3': 'SEN',
    'countryCallingCodes': ['+221'],
    'currencies': ['XOF'],
    'emoji': '🇸🇳',
    'ioc': 'SEN',
    'languages': ['fra'],
    'name': 'Senegal',
    'status': 'assigned',
  },
  'SO': {
    'alpha2': 'SO',
    'alpha3': 'SOM',
    'countryCallingCodes': ['+252'],
    'currencies': ['SOS'],
    'emoji': '🇸🇴',
    'ioc': 'SOM',
    'languages': ['som'],
    'name': 'Somalia',
    'status': 'assigned',
  },
  'SR': {
    'alpha2': 'SR',
    'alpha3': 'SUR',
    'countryCallingCodes': ['+597'],
    'currencies': ['SRD'],
    'emoji': '🇸🇷',
    'ioc': 'SUR',
    'languages': ['nld'],
    'name': 'Suriname',
    'status': 'assigned',
  },
  'SS': {
    'alpha2': 'SS',
    'alpha3': 'SSD',
    'countryCallingCodes': ['+211'],
    'currencies': ['SSP'],
    'emoji': '🇸🇸',
    'ioc': 'SSD',
    'languages': ['eng'],
    'name': 'South Sudan',
    'status': 'assigned',
  },
  'ST': {
    'alpha2': 'ST',
    'alpha3': 'STP',
    'countryCallingCodes': ['+239'],
    'currencies': ['STD'],
    'emoji': '🇸🇹',
    'ioc': 'STP',
    'languages': ['por'],
    'name': 'Sao Tome and Principe',
    'status': 'assigned',
  },
  'SV': {
    'alpha2': 'SV',
    'alpha3': 'SLV',
    'countryCallingCodes': ['+503'],
    'currencies': ['USD'],
    'emoji': '🇸🇻',
    'ioc': 'ESA',
    'languages': ['spa'],
    'name': 'El Salvador',
    'status': 'assigned',
  },
  'SX': {
    'alpha2': 'SX',
    'alpha3': 'SXM',
    'countryCallingCodes': ['+1 721'],
    'currencies': ['ANG'],
    'emoji': '🇸🇽',
    'ioc': '',
    'languages': ['nld'],
    'name': 'Sint Maarten',
    'status': 'assigned',
  },
  'SY': {
    'alpha2': 'SY',
    'alpha3': 'SYR',
    'countryCallingCodes': ['+963'],
    'currencies': ['SYP'],
    'emoji': '🇸🇾',
    'ioc': 'SYR',
    'languages': ['ara'],
    'name': 'Syrian Arab Republic',
    'status': 'assigned',
  },
  'SZ': {
    'alpha2': 'SZ',
    'alpha3': 'SWZ',
    'countryCallingCodes': ['+268'],
    'currencies': ['SZL'],
    'emoji': '🇸🇿',
    'ioc': 'SWZ',
    'languages': ['eng', 'ssw'],
    'name': 'Swaziland',
    'status': 'assigned',
  },
  'TC': {
    'alpha2': 'TC',
    'alpha3': 'TCA',
    'countryCallingCodes': ['+1 649'],
    'currencies': ['USD'],
    'emoji': '🇹🇨',
    'ioc': '',
    'languages': ['eng'],
    'name': 'Turks And Caicos Islands',
    'status': 'assigned',
  },
  'TD': {
    'alpha2': 'TD',
    'alpha3': 'TCD',
    'countryCallingCodes': ['+235'],
    'currencies': ['XAF'],
    'emoji': '🇹🇩',
    'ioc': 'CHA',
    'languages': ['ara', 'fra'],
    'name': 'Chad',
    'status': 'assigned',
  },
  'TF': {
    'alpha2': 'TF',
    'alpha3': 'ATF',
    'countryCallingCodes': [],
    'currencies': ['EUR'],
    'emoji': '🇹🇫',
    'ioc': '',
    'languages': ['fra'],
    'name': 'French Southern Territories',
    'status': 'assigned',
  },
  'TG': {
    'alpha2': 'TG',
    'alpha3': 'TGO',
    'countryCallingCodes': ['+228'],
    'currencies': ['XOF'],
    'emoji': '🇹🇬',
    'ioc': 'TOG',
    'languages': ['fra'],
    'name': 'Togo',
    'status': 'assigned',
  },
  'TH': {
    'alpha2': 'TH',
    'alpha3': 'THA',
    'countryCallingCodes': ['+66'],
    'currencies': ['THB'],
    'emoji': '🇹🇭',
    'ioc': 'THA',
    'languages': ['tha'],
    'name': 'Thailand',
    'status': 'assigned',
  },
  'TJ': {
    'alpha2': 'TJ',
    'alpha3': 'TJK',
    'countryCallingCodes': ['+992'],
    'currencies': ['TJS'],
    'emoji': '🇹🇯',
    'ioc': 'TJK',
    'languages': ['tgk', 'rus'],
    'name': 'Tajikistan',
    'status': 'assigned',
  },
  'TK': {
    'alpha2': 'TK',
    'alpha3': 'TKL',
    'countryCallingCodes': ['+690'],
    'currencies': ['NZD'],
    'emoji': '🇹🇰',
    'ioc': '',
    'languages': ['eng'],
    'name': 'Tokelau',
    'status': 'assigned',
  },
  'TL': {
    'alpha2': 'TL',
    'alpha3': 'TLS',
    'countryCallingCodes': ['+670'],
    'currencies': ['USD'],
    'emoji': '🇹🇱',
    'ioc': 'TLS',
    'languages': ['por'],
    'name': 'Timor-Leste, Democratic Republic of',
    'status': 'assigned',
  },
  'TM': {
    'alpha2': 'TM',
    'alpha3': 'TKM',
    'countryCallingCodes': ['+993'],
    'currencies': ['TMT'],
    'emoji': '🇹🇲',
    'ioc': 'TKM',
    'languages': ['tuk', 'rus'],
    'name': 'Turkmenistan',
    'status': 'assigned',
  },
  'TN': {
    'alpha2': 'TN',
    'alpha3': 'TUN',
    'countryCallingCodes': ['+216'],
    'currencies': ['TND'],
    'emoji': '🇹🇳',
    'ioc': 'TUN',
    'languages': ['ara'],
    'name': 'Tunisia',
    'status': 'assigned',
  },
  'TO': {
    'alpha2': 'TO',
    'alpha3': 'TON',
    'countryCallingCodes': ['+676'],
    'currencies': ['TOP'],
    'emoji': '🇹🇴',
    'ioc': 'TGA',
    'languages': ['eng'],
    'name': 'Tonga',
    'status': 'assigned',
  },
  'TR': {
    'alpha2': 'TR',
    'alpha3': 'TUR',
    'countryCallingCodes': ['+90'],
    'currencies': ['TRY'],
    'emoji': '🇹🇷',
    'ioc': 'TUR',
    'languages': ['tur'],
    'name': 'Turkey',
    'status': 'assigned',
  },
  'TT': {
    'alpha2': 'TT',
    'alpha3': 'TTO',
    'countryCallingCodes': ['+1 868'],
    'currencies': ['TTD'],
    'emoji': '🇹🇹',
    'ioc': 'TTO',
    'languages': ['eng'],
    'name': 'Trinidad And Tobago',
    'status': 'assigned',
  },
  'TV': {
    'alpha2': 'TV',
    'alpha3': 'TUV',
    'countryCallingCodes': ['+688'],
    'currencies': ['AUD'],
    'emoji': '🇹🇻',
    'ioc': 'TUV',
    'languages': ['eng'],
    'name': 'Tuvalu',
    'status': 'assigned',
  },
  'TW': {
    'alpha2': 'TW',
    'alpha3': 'TWN',
    'countryCallingCodes': ['+886'],
    'currencies': ['TWD'],
    'emoji': '🇹🇼',
    'ioc': 'TPE',
    'languages': ['zho'],
    'name': 'Taiwan',
    'status': 'assigned',
  },
  'TZ': {
    'alpha2': 'TZ',
    'alpha3': 'TZA',
    'countryCallingCodes': ['+255'],
    'currencies': ['TZS'],
    'emoji': '🇹🇿',
    'ioc': 'TAN',
    'languages': ['swa', 'eng'],
    'name': 'Tanzania, United Republic Of',
    'status': 'assigned',
  },
  'UA': {
    'alpha2': 'UA',
    'alpha3': 'UKR',
    'countryCallingCodes': ['+380'],
    'currencies': ['UAH'],
    'emoji': '🇺🇦',
    'ioc': 'UKR',
    'languages': ['ukr', 'rus'],
    'name': 'Ukraine',
    'status': 'assigned',
  },
  'UG': {
    'alpha2': 'UG',
    'alpha3': 'UGA',
    'countryCallingCodes': ['+256'],
    'currencies': ['UGX'],
    'emoji': '🇺🇬',
    'ioc': 'UGA',
    'languages': ['eng', 'swa'],
    'name': 'Uganda',
    'status': 'assigned',
  },
  'UM': {
    'alpha2': 'UM',
    'alpha3': 'UMI',
    'countryCallingCodes': ['+1'],
    'currencies': ['USD'],
    'emoji': '🇺🇲',
    'ioc': '',
    'languages': ['eng'],
    'name': 'United States Minor Outlying Islands',
    'status': 'assigned',
  },
  'US': {
    'alpha2': 'US',
    'alpha3': 'USA',
    'countryCallingCodes': ['+1'],
    'currencies': ['USD'],
    'emoji': '🇺🇸',
    'ioc': 'USA',
    'languages': ['eng'],
    'name': 'United States',
    'status': 'assigned',
  },
  'UY': {
    'alpha2': 'UY',
    'alpha3': 'URY',
    'countryCallingCodes': ['+598'],
    'currencies': ['UYU'],
    'emoji': '🇺🇾',
    'ioc': 'URU',
    'languages': ['spa'],
    'name': 'Uruguay',
    'status': 'assigned',
  },
  'UZ': {
    'alpha2': 'UZ',
    'alpha3': 'UZB',
    'countryCallingCodes': ['+998'],
    'currencies': ['UZS'],
    'emoji': '🇺🇿',
    'ioc': 'UZB',
    'languages': ['uzb', 'rus'],
    'name': 'Uzbekistan',
    'status': 'assigned',
  },
  'VA': {
    'alpha2': 'VA',
    'alpha3': 'VAT',
    'countryCallingCodes': ['+379', '+39'],
    'currencies': ['EUR'],
    'emoji': '🇻🇦',
    'ioc': '',
    'languages': ['ita'],
    'name': 'Vatican City State',
    'status': 'assigned',
  },
  'VC': {
    'alpha2': 'VC',
    'alpha3': 'VCT',
    'countryCallingCodes': ['+1 784'],
    'currencies': ['XCD'],
    'emoji': '🇻🇨',
    'ioc': 'VIN',
    'languages': ['eng'],
    'name': 'Saint Vincent And The Grenadines',
    'status': 'assigned',
  },
  'VE': {
    'alpha2': 'VE',
    'alpha3': 'VEN',
    'countryCallingCodes': ['+58'],
    'currencies': ['VEF'],
    'emoji': '🇻🇪',
    'ioc': 'VEN',
    'languages': ['spa'],
    'name': 'Venezuela, Bolivarian Republic Of',
    'status': 'assigned',
  },
  'VG': {
    'alpha2': 'VG',
    'alpha3': 'VGB',
    'countryCallingCodes': ['+1 284'],
    'currencies': ['USD'],
    'emoji': '🇻🇬',
    'ioc': 'IVB',
    'languages': ['eng'],
    'name': 'Virgin Islands (British)',
    'status': 'assigned',
  },
  'VI': {
    'alpha2': 'VI',
    'alpha3': 'VIR',
    'countryCallingCodes': ['+1 340'],
    'currencies': ['USD'],
    'emoji': '🇻🇮',
    'ioc': 'ISV',
    'languages': ['eng'],
    'name': 'Virgin Islands (US)',
    'status': 'assigned',
  },
  'VN': {
    'alpha2': 'VN',
    'alpha3': 'VNM',
    'countryCallingCodes': ['+84'],
    'currencies': ['VND'],
    'emoji': '🇻🇳',
    'ioc': 'VIE',
    'languages': ['vie'],
    'name': 'Viet Nam',
    'status': 'assigned',
  },
  'VU': {
    'alpha2': 'VU',
    'alpha3': 'VUT',
    'countryCallingCodes': ['+678'],
    'currencies': ['VUV'],
    'emoji': '🇻🇺',
    'ioc': 'VAN',
    'languages': ['bis', 'eng', 'fra'],
    'name': 'Vanuatu',
    'status': 'assigned',
  },
  'WF': {
    'alpha2': 'WF',
    'alpha3': 'WLF',
    'countryCallingCodes': ['+681'],
    'currencies': ['XPF'],
    'emoji': '🇼🇫',
    'ioc': '',
    'languages': ['fra'],
    'name': 'Wallis And Futuna',
    'status': 'assigned',
  },
  'WS': {
    'alpha2': 'WS',
    'alpha3': 'WSM',
    'countryCallingCodes': ['+685'],
    'currencies': ['WST'],
    'emoji': '🇼🇸',
    'ioc': 'SAM',
    'languages': ['eng', 'smo'],
    'name': 'Samoa',
    'status': 'assigned',
  },
  'XK': {
    'alpha2': 'XK',
    'alpha3': '',
    'countryCallingCodes': ['+383'],
    'currencies': ['EUR'],
    'emoji': '',
    'ioc': 'KOS',
    'languages': ['sqi', 'srp', 'bos', 'tur', 'rom'],
    'name': 'Kosovo',
    'status': 'user assigned',
  },
  'YE': {
    'alpha2': 'YE',
    'alpha3': 'YEM',
    'countryCallingCodes': ['+967'],
    'currencies': ['YER'],
    'emoji': '🇾🇪',
    'ioc': 'YEM',
    'languages': ['ara'],
    'name': 'Yemen',
    'status': 'assigned',
  },
  'YT': {
    'alpha2': 'YT',
    'alpha3': 'MYT',
    'countryCallingCodes': ['+262'],
    'currencies': ['EUR'],
    'emoji': '🇾🇹',
    'ioc': '',
    'languages': ['fra'],
    'name': 'Mayotte',
    'status': 'assigned',
  },
  'ZA': {
    'alpha2': 'ZA',
    'alpha3': 'ZAF',
    'countryCallingCodes': ['+27'],
    'currencies': ['ZAR'],
    'emoji': '🇿🇦',
    'ioc': 'RSA',
    'languages': ['afr', 'eng', 'nbl', 'som', 'tso', 'ven', 'xho', 'zul'],
    'name': 'South Africa',
    'status': 'assigned',
  },
  'ZM': {
    'alpha2': 'ZM',
    'alpha3': 'ZMB',
    'countryCallingCodes': ['+260'],
    'currencies': ['ZMW'],
    'emoji': '🇿🇲',
    'ioc': 'ZAM',
    'languages': ['eng'],
    'name': 'Zambia',
    'status': 'assigned',
  },
  'ZW': {
    'alpha2': 'ZW',
    'alpha3': 'ZWE',
    'countryCallingCodes': ['+263'],
    'currencies': ['ZAR'],
    'emoji': '🇿🇼',
    'ioc': 'ZIM',
    'languages': ['eng', 'sna', 'nde'],
    'name': 'Zimbabwe',
    'status': 'assigned',
  },
}

export { countryReferenceMap }

