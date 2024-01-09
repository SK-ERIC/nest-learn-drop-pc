import ReactDOM from 'react-dom/client';

import { ApolloProvider } from '@apollo/client';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';

import App from './App';
import './index.css';
import { client } from './utils/apollo';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ApolloProvider client={client}>
    <ConfigProvider locale={zhCN}>
      <App />
    </ConfigProvider>
  </ApolloProvider>,
);
