/* @flow */

import { migration1 } from './migration_1';
import { migration2 } from './migration_2';
import { migration3 } from './migration_3';
import { migration4 } from './migration_4';
import { migration5 } from './migration_5';
import { migration6 } from './migration_6';

const availableMigrations = {
  '1': migration1,
  '2': migration2,
  '3': migration3,
  '4': migration4,
  '5': migration5,
  '6': migration6,
};

/*

export const
  /!* TODO 1 MFG-13 Migration process *!/
  migrate = (dispatch: MyDispatch, uid: UID) => {
    fbs.database()
      .ref(`accounts/${uid}/version`)
      .transaction(versionCheck => {
        fbs.database()
          .ref(`accounts/${uid}`)
          // todo make backup syncronized online
          .once('value', (accountToBackupSnap) => {
            const accountToBackup = accountToBackupSnap.val();
            dispatch(backupAccountAC());
            if (accountToBackup && versionCheck !== (accountToBackup.version || null)) {
              fbs.database()
                .ref(`accounts/${uid}`)
                // todo make backup syncronized online
                .on('value', () => {
                });
              dispatch(backupAccountFailureAC());
              Alert.alert(
                'Fail',
                'Local account is outdated. Restarting app.',
                [
                  {
                    text: 'Ok',
                    onPress: () => dispatch(coreActionCreators.restartAppAC()),
                  },
                ]);
              return;
            }
            if (accountToBackup) {
              fbs.database()
                .ref(`accountMigrationBackup/${uid}/${accountToBackup.version || 0}/${Date.now()}`)
                .set(accountToBackup)
                .then(() => {
                  fbs.database()
                    .ref(`accounts/${uid}`)
                    .transaction((account) => {
                      dispatch(applyingMigrationAC());

                      const
                        { version = 0 } = account,
                        onFailure = () => failure(
                          dispatch,
                          failure(
                            dispatch,
                            strings.formatString(
                              strings.cantMigrate,
                              version.toString(),
                              codeAccountDataVersion.toString(),
                            ),
                          ),
                        );

                      if (codeAccountDataVersion > version) {
                        try {
                          const migration = availableMigrations[version + 1];
                          if (!migration) {
                            onFailure()
                          }
                          dispatch(savingMigrationAC());
                          return migration(account, uid);
                        } catch (e) {
                          reportException(e);
                        }
                      }

                      onFailure();
                      dispatch(backupAccountFailureAC());
                      return account;
                    })
                    .then(() => {
                      dispatch(coreActionCreators.restartAppAC());
                    });
                });
            }
          });

        return versionCheck;
      });
  };
*/
