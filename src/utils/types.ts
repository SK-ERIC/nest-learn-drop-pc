export interface IPropChild {
  children: React.ReactNode;
}

export interface IValue {
  label: string;
  value: string;
}

export interface IUser {
  id: string;
  account: string;
  name: string;
  desc: string;
  avatar: string;
  refetchHandler?: () => void;
  currentOrg?: string;
}

export interface IPage {
  pageNum: number;
  pageSize: number;
  total: number;
}
