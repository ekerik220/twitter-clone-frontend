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
    heightDivider: number;
    target: "list" | "profile" | "avatar";
  };
  globalUI: {
    tooltipOpen: boolean;
  };
  comment: {
    modalOpen: boolean;
    tweet: Tweet | null;
  };
  retweet: {
    modalOpen: boolean;
    tweet: Tweet | null;
  };
  tweetModal: {
    modalOpen: boolean;
  };
  explore: {
    currentCategory: "trending" | "search";
    searchTerm: string;
    onExploreScreen: boolean;
  };
  notifications: {
    currentCategory: "notifications" | "mentions";
  };
  listModal: {
    open: boolean;
    page: 1 | 2;
    pageTwoCategory: "suggested" | "members";
    img: string;
    listID: string;
    editMode: boolean;
    name: string;
    description: string;
  };
  profile: {
    currentCategory: "tweets" | "media" | "likes";
    modalOpen: boolean;
    profileImg: string;
    avatarImg: string;
    bio: string;
    username: string;
  };
}
