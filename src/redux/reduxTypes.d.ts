interface RootState {
  signup: {
    userInfo: {
      name: string;
      email: string;
      month: string;
      day: string;
      year: string;
      trackBrowsing: boolean;
      id: string;
    };
    currentPage: 1 | 2 | 3 | 4 | 5;
    currentPageValidated: boolean;
    focusedField: string;
    shouldTryCode: boolean;
    shouldTryPassword: boolean;
    modalOpen: boolean;
  };
  user: {
    token: string | null;
    userID: string;
    avatar: string;
  };
  imageEditor: {
    open: boolean;
    file: string;
  };
  globalUI: {
    tooltipOpen: boolean;
  };
}
