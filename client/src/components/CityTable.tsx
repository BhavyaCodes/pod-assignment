import axios, { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { SearchSortByCities } from '../types';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { DisplayTable } from './Table';

export type ResponseData = {
  info: {
    currentPage: number;
    lastPage: number;
    totalItemsAfterFilter: 29353;
  };
  data: {
    city: string;
    loc: [number, number];
    pop: number;
    state: string;
  }[];
};

export default function CityTable() {
  const [limit, setLimit] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [sortBy, setSortBy] = useState<SearchSortByCities>('city');
  const [sortOrder, setSortOrder] = useState<1 | -1>(1);
  const [searchValue, setSearchValue] = useState<string>('');
  const [searchField, setSearchField] = useState<
    undefined | SearchSortByCities
  >(undefined);

  const [data, setData] = useState<null | ResponseData>(null);
  console.log(data);

  const handleChangeSortBy = (event: SelectChangeEvent) => {
    setSortBy(event.target.value as SearchSortByCities);
  };

  const handleChangeSortOrder = (event: SelectChangeEvent) => {
    setSortOrder(Number(event.target.value) as 1 | -1);
  };

  const fetchData = () => {
    axios
      .get<ResponseData>('/api/cities/all-filtered', {
        params: {
          limit,
          page,
          sortBy,
          sortOrder,
          searchValue,
          searchField,
        },
      })
      .then((res) => setData(res.data))
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    fetchData();
  }, [limit, page, sortBy, sortOrder, searchValue, searchField]);

  return (
    <div>
      <InputLabel id="select-sort-by-label">Age</InputLabel>
      <Select
        labelId="select-sort-by-label"
        id="select-sort-by"
        value={sortBy}
        label="sort By Field"
        onChange={handleChangeSortBy}
      >
        <MenuItem value="city">city</MenuItem>
        <MenuItem value="state">state</MenuItem>
        <MenuItem value="pop">population</MenuItem>
      </Select>
      <InputLabel id="select-sort-order-label">Age</InputLabel>
      <Select
        labelId="select-sort-order-label"
        id="select-sort-order"
        value={sortOrder.toString()}
        label="sort By Field"
        onChange={handleChangeSortOrder}
      >
        <MenuItem value={1}>Asc</MenuItem>
        <MenuItem value={-1}>Dsc</MenuItem>
      </Select>

      <label>
        search
        <input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </label>
      {/* <TextField id="outlined-basic" label="Outlined" variant="outlined" /> */}
      <DisplayTable
        page={page}
        setPage={setPage}
        rowsPerPage={limit}
        setRowsPerPage={setLimit}
        data={data}
        sortBy={sortBy}
        setSortBy={setSortBy}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      />
    </div>
  );
}
