interface RootState {
  signup: {
    userInfo: {
      name: string;
      email: string;
      month: string;
      day: string;
      year: string;
    };
    currentPageValidated: boolean;
  };
}
