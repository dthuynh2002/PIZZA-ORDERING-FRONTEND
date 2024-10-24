import styled from 'styled-components';

export const WrapperMenuScroll = styled.div`
    height: calc(104vh - 100px);
    overflow-y: auto;

    &::-webkit-scrollbar {
        width: 6px;
    }

    &::-webkit-scrollbar-thumb {
        background-color: #d7282f;
        border-radius: 10px;
    }
`;
