interface RootState {
  signup: {
    userInfo: {
      name: string;
      email: string;
      month: string;
      day: string;
      year: string;
      trackBrowsing: boolean;
    };
    currentPage: 1 | 2 | 3 | 4 | 5;
    currentPageValidated: boolean;
    focusedField: string;
  };
}
