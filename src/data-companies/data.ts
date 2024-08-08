export interface CompanyType {
  id: number;
  title: string;
  address: string;
  checked: boolean;
}

export const companiesData: CompanyType[] = [
  {
    id: 1,
    title: "Tesla",
    address: "3500 Deer Creek Road, Palo Alto, CA",
    checked: false,
  },
  {
    id: 2,
    title: "Apple",
    address: "1 Infinite Loop, Cupertino, CA",
    checked: false,
  },
  {
    id: 3,
    title: "Google",
    address: "1600 Amphitheatre Parkway, Mountain View, CA",
    checked: false,
  },
  {
    id: 4,
    title: "Microsoft",
    address: "One Microsoft Way, Redmond, WA",
    checked: false,
  },
  {
    id: 5,
    title: "Amazon",
    address: "410 Terry Ave North, Seattle, WA",
    checked: false,
  },
  {
    id: 6,
    title: "Facebook",
    address: "1 Hacker Way, Menlo Park, CA",
    checked: false,
  },
  {
    id: 7,
    title: "Netflix",
    address: "100 Winchester Circle, Los Gatos, CA",
    checked: false,
  },
  {
    id: 8,
    title: "Twitter",
    address: "1355 Market Street, Suite 900, San Francisco, CA",
    checked: false,
  },
  {
    id: 9,
    title: "LinkedIn",
    address: "1000 W Maude Ave, Sunnyvale, CA",
    checked: false,
  },
  {
    id: 10,
    title: "Uber",
    address: "1455 Market Street, Suite 400, San Francisco, CA",
    checked: false,
  },
];
