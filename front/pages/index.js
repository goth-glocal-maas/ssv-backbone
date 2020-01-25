import App from "../components/App"
import InfoBox from "../components/InfoBox"
import { withApollo } from "../lib/apollo"

const IndexPage = props => (
  <App>
    <InfoBox><h1>ข้อมูลพื้นฐาน</h1></InfoBox>
    <p>
      กลุ่มนาแปลงใหญ่ตำบลมะเกลือใหม่ อำเภอสูงเนิน จังหวัดนครราชสีมา
      เกิดขึ้นจากการรวมกลุ่มของเกษตรกรในพื้นที่ตำบลมะเกลือใหม่ อำเภอสูงเนิน
      จังหวัดนครราชสีมา
      โดยได้รับการสนับสนุนให้ดำเนินโครงการส่งเสริมการเกษตรนาแปลงใหญ่ ตั้งแต่ปี
      พ.ศ. 2558 – ปัจจุบัน
      โครงการแปลงใหญ่เป็นนโยบายการปรับโครงสร้างการผลิตสินค้าเกษตร
      ที่ให้ความสำคัญในเรื่องการเพิ่มประสิทธิภาพการผลิต ได้แก่ ลดต้นทุนการผลิต
      เพิ่มผลผลิตต่อพื้นที่ พัฒนาคุณภาพมาตรฐานตรงตามความต้องการของตลาด
      การรวมกลุ่มการผลิต มีการบริหารจัดการร่วมกัน
      และสร้างเครือข่ายที่มีการเชื่อมโยงและเกื้อกูลกัน
      ภายใต้การสนับสนุนของทุกหน่วยงานสังกัดกระทรวงเกษตรและสหกรณ์
      เพื่อเพิ่มขีดความสามารถในการแข่งขันสินค้าเกษตร และเพิ่มรายได้ของเกษตรกร
      ตลอดจนพัฒนาคุณภาพชีวิตของเกษตรกร
      โดยจัดทำโครงการระบบส่งเสริมการเกษตรแบบแปลงใหญ่
      ที่มีเกษตรกรเป็นศูนย์กลางผลักดันให้เกษตรกรรวมกลุ่ม
      และมีการบริหารจัดการร่วมกัน
      เพื่อลดต้นทุนและเพิ่มประสิทธิภาพการผลิตสินค้าเกษตร
      ตลอดจนด้านการตลาดตามยุทธศาสตร์ชาติ 20 ปีของรัฐบาล
    </p>

    <p>
      กลุ่มนาแปลงใหญ่ ตำบลมะเกลือใหม่ อำเภอสูงเนิน ดำเนินการผลิตข้าวขาวดอกมะลิ
      105 ไว้เพื่อบริโภค จำหน่ายเป็นข้าวเปลือกและแปรรูป
      อีกทั้งยังเป็นพื้นที่เกษตรกรรมแหล่งปลูกข้าวขาวดอกมะลิ 105 ที่มีคุณภาพ
      และมีชื่อเสียงที่สำคัญแหล่งหนึ่งของจังหวัดนครราชสีมา
      การเข้าร่วมกลุ่มของเกษตรกรจะคัดเลือกจากสมาชิกที่ความสมัครใจ
      และลดการใช้สารเคมีกำจัดวัชพืชและแมลงศัตรูพืชในข้าว
      และได้มีการใช้ปุ๋ยคอกเป็นหลักทดแทนการใช้ปุ๋ยเคมี ต่อมาในปี พ.ศ. 2561
      กลุ่มฯได้ขอรับรองมาตรฐานตามการปฏิบัติการเกษตรที่ดี (GAP)
      ในนามกลุ่มเกษตรกรตำบลมะเกลือใหม่ อำเภอสูงเนิน จังหวัดนครราชสีมา
    </p>
    <p>
      กลุ่มนาแปลงใหญ่ ตำบลมะเกลือใหม่ อำเภอสูงเนิน มีการดำเนินการและรวมกลุ่ม
      จำนวน 3 กลุ่ม คือ นาแปลงใหญ่ ปี 2559 นาแปลงใหญ่ ปี 2560 และ นาแปลงใหญ่ ปี
      2561 (กลุ่มนครชัยบุรินทร์) เกษตรกรสมาชิกกลุ่มนาแปลงใหญ่มีจำนวนโดยประมาณ
      100 ราย พื้นที่ปลูกข้าวรวมประมาณ 1,000 ไร่ โดยแบ่งเป็นผู้ผลิตเมล็ดพันธุ์
      28 ราย พื้นที่ 200 ไร่ ผลิตข้าวเปลือกคุณภาพดี 72 ราย พื้นที่ 800 ไร่
      มีศูนย์เรียนรู้การเพิ่มประสิทธิภาพการผลิตสินค้าเกษตร
      ศูนย์ข้าวชุมชนมะเกลือใหม่ สินค้าหลัก คือ ข้าวขาวดอกมะลิ 105 ผลผลิตเฉลี่ย
      585 กิโลกรัม/ไร่ กลุ่มฯ ได้รับการส่งเสริมด้านเมล็ดพันธุ์ ปุ๋ย
      และเครื่องจักรกลเกษตร เช่น เครื่องไถ หว่าน
      ในด้านช่องทางการจัดจำหน่ายสมาชิกเกษตรกรนาแปลงใหญ่
      มีผู้รับซื้อผลผลิตจากสมาชิกเกษตรกรนาแปลงใหญ่ทั้งโรงสีชุมชนและโรงสีเอกชนในพื้นที่ใกล้เคียง
      ราคาผลผลิตเฉลี่ยที่จำหน่ายได้ 16.20 บาท/กิโลกรัม
    </p>
  </App>
)

export default withApollo(IndexPage)
