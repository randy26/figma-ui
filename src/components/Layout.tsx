import Sidebar from './Sidebar';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f9fafe' }}>
      <Sidebar />
      <div style={{ marginLeft: '0px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <header
          style={{
            height: '64px',
            background: 'linear-gradient(135deg, #1e3c72, #2a5298)',
            color: '#e3eafc',
            display: 'flex',
            alignItems: 'center',
            padding: '0 2rem',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
            fontWeight: 600,
            fontSize: '18px',
          }}
        >
          Encabezado
        </header>

        <main style={{ flex: 1, padding: '2rem' }}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
