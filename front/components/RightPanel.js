import Link from "next/link";

const RightPanel = () => {
  let items = [];
  // if (items.length === 0) return <></>
  return (
    <div className="dashboard-panel is-small has-background-light is-scrollable">
      <p className="is-size-7 has-text-weight-light">เมนู</p>
      <hr className="has-background-grey" />
      <span>จัดการข้อมูลเกษตรกร</span>
      <Link href="/land">
        <a className="is-size-7">• ข้อมูลเชิงพื้นที่และการถือครองที่ดิน</a>
      </Link>
      <Link href="/crop">
        <a className="is-size-7">• ข้อมูลการปลูกข้าวและชนิดข้าวที่ปลูก</a>
      </Link>
      <Link href="/budget">
        <a className="is-size-7">• บันทึกข้อมูลต้นทุน - รายรับ – รายจ่าย</a>
      </Link>
      <Link href="/asset">
        <a className="is-size-7">• ข้อมูลทรัพย์สินทางการเกษตรที่มี</a>
      </Link>
      <Link href="/water">
        <a className="is-size-7">• ข้อมูลการใช้น้ำในการปลูกข้าว</a>
      </Link>
      <span className="is-size-7">• ข้อมูลเกี่ยวกับข้าว GAP</span>
      <span className="is-size-7">• ข้อมูลการเก็บเกี่ยวและการขายข้าว</span>
      <span className="is-size-7">• ข้อมูลปัญหาที่ประสบอยู่ในการปลูกข้าว</span>
      <style jsx>{`
        .dashboard-panel {
          display: flex;
          flex-direction: column;
          padding: 1.5rem 1rem;
          flex: 0 0 20rem;
          line-height: 1.5rem;
        }
        hr {
          border-top: 1px solid #cdcdcd;
          height: 1px;
          margin: 5px 0;
        }
        .dashboard-panel.a {
          clear: both;
        }
        .dashboard-panel.left {
          flex: 0 0 20rem;
        }
        .dashboard-panel.right {
          flex: 0 0 20rem;
        }
        .dashboard-panel.has-thick-padding {
          padding: 3rem 2rem;
        }
        .dashboard-panel.is-one-quarter {
          flex: 0 0 25%;
        }
        .dashboard-panel.is-half {
          flex: 0 0 50%;
        }
        .dashboard-panel.is-one-third {
          flex: 0 0 33.3333333333%;
        }
        .dashboard-panel.is-small {
          flex: 0 0 12rem;
          font-size: 0.7rem;
        }
        .dashboard-panel.is-medium {
          flex: 0 0 20rem;
        }
        .dashboard-panel.is-large {
          flex: 0 0 30rem;
        }
        .dashboard-panel-header.is-centered,
        .dashboard-panel-content.is-centered,
        .dashboard-panel-footer.is-centered {
          display: flex;
          justify-content: center;
        }
        .dashboard-panel-header {
          margin-bottom: 2rem;
        }
        .dashboard-panel-main {
          flex: 1;
        }
        .dashboard-panel-footer {
          margin-top: 2rem;
        }
      `}</style>
    </div>
  );
};

export default RightPanel;
