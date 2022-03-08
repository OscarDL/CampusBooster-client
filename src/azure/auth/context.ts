import { AccountInfo, AuthenticationResult, PopupRequest, PublicClientApplication } from '@azure/msal-browser';

import { MSAL_CONFIG } from './config';


export class AzureAuthenticationContext {
  private myMSALObj: PublicClientApplication = new PublicClientApplication(MSAL_CONFIG);

  private account?: AccountInfo;
  private loginRequest?: PopupRequest;

  public isAuthenticationConfigured = false;


  constructor() {
    // @ts-ignore
    this.account = null;
    this.setRequestObjects();

    if (MSAL_CONFIG?.auth?.clientId) {
      this.isAuthenticationConfigured = true;
    }
  };


  private setRequestObjects(): void {
    this.loginRequest = {
      scopes: [],
      prompt: "select_account",
    };
  };


  login = async (setUser: any): Promise<void> => {
    await this.myMSALObj
      .loginPopup(this.loginRequest)
      .then((resp: AuthenticationResult) => {
        this.handleResponse(resp, setUser);
      })
      .catch((err) => {
        console.error(err);
      });
  };


  logout = async (account: AccountInfo): Promise<void> => {
    await this.myMSALObj.logoutPopup({account});
  };


  handleResponse = (response: AuthenticationResult, incomingFunction: any) => {
    if (response !== null && response.account !== null) {
      this.account = response.account;
    }
    else {
      this.account = this.getAccount();
    }

    if (this.account) {
      incomingFunction(this.account);
    }
  };


  private getAccount(): AccountInfo | undefined {
    const currentAccounts = this.myMSALObj.getAllAccounts();
    if (currentAccounts === null) {
      console.log('No account detected.');
      return undefined;
    }

    else if (currentAccounts.length > 1) {
      console.log('Multiple accounts detected.');
      return currentAccounts[0];
    }

    else if (currentAccounts.length === 1) {
      return currentAccounts[0];
    }
  };
}


export default AzureAuthenticationContext;
