import { BallTriangle } from 'react-loader-spinner';

export default function Loader() {
  return (
    <BallTriangle
      height={60}
      width={60}
      radius={5}
      color="#3f51b5"
      ariaLabel="ball-triangle-loading"
      wrapperClass={{}}
      wrapperStyle={{
        display: 'flex',
        justifyContent: 'center',
        marginTop: '15px',
      }}
      visible={true}
    />
  );
}
