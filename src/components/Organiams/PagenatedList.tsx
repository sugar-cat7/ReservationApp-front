import React, { useState, useEffect } from 'react';
import api from '../../utils/fetch';
import Pagination from '@mui/material/Pagination';

type Props = {
  childComponent: (props: any) => React.ReactNode;
  itemPerPage: number;
  apiPath: string;
  onClickItem?: (value: any) => void;
};

const PagenatedList: React.FC<Props> = ({ childComponent, itemPerPage, apiPath, onClickItem }) => {
  const [page, setPage] = useState(1);
  const [itemLength, setItemLength] = useState(0);
  const [items, setItems] = useState([]);

  useEffect(() => {
    api
      .get(`${apiPath}&page=${page}&itemPerPage=${itemPerPage}`)
      .then((data) => {
        setItems(data.items);
        setItemLength(Math.ceil(data.total / itemPerPage));
      })
      .catch((e) => alert(e));
  }, [page]);

  const onChangePage = (event: React.ChangeEvent<unknown>, page: number) => {
    setPage(page);
  };

  return (
    <>
      {items.map((value: any, idx: number) => {
        const props = {
          onClick: () => {
            if (typeof onClickItem == 'function') onClickItem(value);
          },
          key: idx,
          value: value,
        };
        return <div key={idx}>{childComponent(props)}</div>;
      })}
      <div className="mb-4">
        <Pagination count={itemLength} defaultPage={1} onChange={onChangePage} />
      </div>
    </>
  );
};

export default PagenatedList;
