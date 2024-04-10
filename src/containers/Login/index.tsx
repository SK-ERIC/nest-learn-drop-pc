import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { LoginFormPage, ProFormText } from '@ant-design/pro-components';
import { useMutation } from '@apollo/client';
import { Tabs, message, theme } from 'antd';

import { LOGIN } from '../../graphql/auth';
import styles from './index.module.less';

interface IValue {
  account: string;
  password: string;
}

export default () => {
  const { token } = theme.useToken();
  const [login] = useMutation(LOGIN);

  const loginHandler = async (values: IValue) => {
    const res = await login({
      variables: values,
    });

    if (res.data.login.code === 200) {
      message.success(res.data.login.message);
      return;
    }
    message.error(res.data.login.message);
  };

  const statusRender = (value?: string) => {
    const getStatus = () => {
      if (value && value.length > 12) {
        return 'ok';
      }
      if (value && value.length > 6) {
        return 'pass';
      }
      return 'poor';
    };
    const status = getStatus();
    if (status === 'pass') {
      return <div style={{ color: token.colorWarning }}>强度：中</div>;
    }
    if (status === 'ok') {
      return <div style={{ color: token.colorSuccess }}>强度：强</div>;
    }
    return <div style={{ color: token.colorError }}>强度：弱</div>;
  };

  return (
    <div className={styles.container}>
      <LoginFormPage<IValue>
        initialValues={{ account: 'admin', password: 'admin123' }}
        backgroundImageUrl="https://mdn.alipayobjects.com/huamei_gcee1x/afts/img/A*y0ZTS6WLwvgAAAAAAAAAAAAADml6AQ/fmt.webp"
        backgroundVideoUrl="https://gw.alipayobjects.com/v/huamei_gcee1x/afts/video/jXRBRK_VAwoAAAAAAAAAAAAAK4eUAQBr"
        title="Github"
        subTitle="全球最大的代码托管平台"
        onFinish={loginHandler}
      >
        <Tabs
          centered
          items={[
            {
              key: 'item1',
              label: '账号密码登录',
            },
          ]}
        />
        <>
          <ProFormText
            name="account"
            fieldProps={{
              size: 'large',
              prefix: <UserOutlined className="prefixIcon" />,
            }}
            placeholder="账号: admin"
            rules={[
              {
                required: true,
                message: '请输入账号!',
              },
            ]}
          />
          <ProFormText.Password
            name="password"
            fieldProps={{
              size: 'large',
              prefix: <LockOutlined className="prefixIcon" />,
              strengthText: '密码应包含数字、字母和特殊字符，长度至少为8个字符。',
              statusRender,
            }}
            placeholder="密码: admin123"
            rules={[
              {
                required: true,
                message: '请输入密码！',
              },
            ]}
          />
        </>
      </LoginFormPage>
    </div>
  );
};
