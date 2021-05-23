import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import useApiResult from './src/hooks/useApiResult';
import Table from './src/components/Table';
import {
    USER_FIRSTNAME as firstName,
    USER_USERNAME as username
} from '@env';

const S = {};

S.AppContainer = styled.View `
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 50px;
    border: 2px lightgrey dotted;
`;

function App() {
    const userData = { firstName, username };
    const resultsPerPage = 10;
    const fields = ['FirstName', 'LastName', 'ProviderEmail', 'Review', 'Rating'];
    const allResults = useApiResult();
    const [page, setPage] = useState(0);
    const [currentPage, setCurrentPage] = useState([]);

    useEffect(() => {
        if (allResults.length) {
            const startIndex = page * resultsPerPage;
            const endIndex = (page + 1) * resultsPerPage;

            // TODO: make sure to account for last set of paginated results
            setCurrentPage(allResults.slice(startIndex, endIndex));
        }
    }, [allResults, page]);

    return (
        <S.AppContainer>
            {/* <Table records={currentPage} fields={fields} /> */}
            <Table records={currentPage} userData={userData} />
        </S.AppContainer>
    );
}

export default App;
