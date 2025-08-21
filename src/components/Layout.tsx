import Sidebar from './Sidebar';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f9fafe' }}>
      
      <div style={{ marginLeft: '0px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        {<header>
          <Sidebar />
        </header>}

        <main style={{ flex: 1, padding: '2rem' }}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
