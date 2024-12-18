
export interface Activity {
  id: string;
  type: string;
  title: string;
  timestamp: string;
  user: {
    name: string;
  };
}
