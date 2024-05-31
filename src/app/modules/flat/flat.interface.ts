export type TFlatFilterRequest = {
  availability?: boolean | undefined;
  squareFeet?: number | undefined;
  totalBedrooms?: number | undefined;
  totalRooms?: number | undefined;
  searchTerm?: string | undefined;
};

export type TPaginationOptions = {
  page?: number;
  limit?: number;
  sortOrder?: string | undefined;
  sortBy?: string | undefined;
};
