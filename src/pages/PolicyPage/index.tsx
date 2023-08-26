import { Stack } from '@mui/material';
import { Color, FontFamily, FontSize } from '~/assets/variables';
import globalStyles from '~/styles';

// export interface PolicyPayload {}

const CustomerServiceMail = 'cskh.mismart@yopmail.com';

export default function PolicyPage() {
  return (
    <Stack
      sx={{
        marginX: 4,
        marginY: 2,
        ...globalStyles.viewRoundedWhiteBody,
        minHeight: '100vh',
        h1: {
          fontSize: FontSize.large_35,
          fontFamily: FontFamily.bold,
          fontWeight: 'bold',
        },
        h2: {
          marginTop: 4,
          ...globalStyles.textTitle,
        },
        h3: {
          marginTop: 1,
          ...globalStyles.textSmallLabel,
        },
      }}
    >
      <h1 dir="ltr">
        <strong>ĐIỀU KHOẢN DỊCH VỤ</strong>
      </h1>

      <p dir="ltr">
        <strong>
          Dưới đ&acirc;y l&agrave; những điều khoản được &aacute;p dụng cho học
          vi&ecirc;n v&agrave; đối t&aacute;c của Mismart. Xin h&atilde;y đọc kỹ
          to&agrave;n bộ thỏa thuận trước khi tham gia.
        </strong>
      </p>

      <p dir="ltr">
        Một khi bạn đ&atilde; đăng k&yacute; tham gia tr&ecirc;n{' '}
        <a href="https://mismart.vn/">Mismart</a> ch&uacute;ng t&ocirc;i sẽ hiểu
        rằng bạn đ&atilde; đọc v&agrave; đồng &yacute; to&agrave;n bộ điều khoản
        được đưa ra trong bản thỏa thuận n&agrave;y.
      </p>

      <p dir="ltr">
        Bản cập nhật mới nhất (nếu c&oacute;) sẽ được đăng tại tại đ&acirc;y
        v&agrave; Mismart sẽ kh&ocirc;ng th&ocirc;ng b&aacute;o đến từng đối
        t&aacute;c, v&igrave; vậy bạn h&atilde;y quay lại trang n&agrave;y
        thường xuy&ecirc;n để cập nhật ch&iacute;nh s&aacute;ch mới nhất.
      </p>

      <h2 dir="ltr">
        <strong>ĐIỀU KHOẢN CHUNG </strong>
      </h2>

      <h3 dir="ltr">
        <strong>
          Điều 1: Th&ocirc;ng tin t&agrave;i khoản c&aacute; nh&acirc;n
        </strong>
      </h3>

      <ul dir="ltr">
        <li dir="ltr">
          Khi đăng k&yacute; t&agrave;i khoản Mismart, để được hỗ trợ nhanh
          ch&oacute;ng, bạn cần cung cấp đầy đủ v&agrave; ch&iacute;nh
          x&aacute;c c&aacute;c th&ocirc;ng tin:{' '}
          <strong>
            Họ t&ecirc;n, Email, Số điện thoại, Giới t&iacute;nh, Ng&agrave;y
            sinh,...
          </strong>
        </li>
        <li dir="ltr">
          Ch&uacute;ng t&ocirc;i sử dụng th&ocirc;ng tin li&ecirc;n lạc của bạn
          để{' '}
          <em>
            <strong>gửi m&atilde;&nbsp;k&iacute;ch hoạt tài khoản</strong>
          </em>
          , th&ocirc;ng b&aacute;o chương tr&igrave;nh khuyến m&atilde;i,
          x&aacute;c nhận đổi mật khẩu, c&aacute;c thảo luận trong lớp học,..
        </li>
        <li dir="ltr">
          Th&ocirc;ng tin ng&agrave;y sinh v&agrave; giới t&iacute;nh
          d&ugrave;ng để gợi &yacute; đến bạn những kh&oacute;a học ph&ugrave;
          hợp.
        </li>
        <li dir="ltr">
          Bạn c&oacute; thể đăng nhập bằng t&agrave;i khoản Mismart (email + mật
          khẩu) hoặc đăng nhập bằng Google.
        </li>
        <li dir="ltr">
          Bạn c&oacute; thể cập nhật th&ocirc;ng tin&nbsp;c&aacute; nh&acirc;n
          hoặc hủy (x&oacute;a) t&agrave;i khoản&nbsp;bất kỳ l&uacute;c
          n&agrave;o khi kh&ocirc;ng c&ograve;n nhu cầu sử dụng
        </li>
      </ul>

      <h3 dir="ltr">
        <strong>Điều 2: Việc bảo mật th&ocirc;ng tin</strong>
      </h3>

      <ul>
        <li dir="ltr">
          <p dir="ltr">
            Bạn c&oacute; tr&aacute;ch nhiệm tự m&igrave;nh bảo quản mật khẩu,
            nếu mật khẩu bị lộ ra ngo&agrave;i dưới bất kỳ h&igrave;nh thức
            n&agrave;o, Mismart sẽ kh&ocirc;ng chịu tr&aacute;ch nhiệm về mọi
            tổn thất ph&aacute;t sinh.
          </p>
        </li>
        <li dir="ltr">
          <p dir="ltr">
            Mọi th&ocirc;ng tin c&aacute; nh&acirc;n của bạn sẽ được
            ch&uacute;ng t&ocirc;i bảo mật, kh&ocirc;ng tiết lộ ra ngo&agrave;i.
            Ch&uacute;ng t&ocirc;i kh&ocirc;ng b&aacute;n hay trao đổi những
            th&ocirc;ng tin n&agrave;y với bất kỳ một b&ecirc;n thứ ba
            n&agrave;o kh&aacute;c. Tuy nhi&ecirc;n, trong trường hợp cơ quan
            chức năng y&ecirc;u cầu, Mismart buộc phải cung cấp những
            th&ocirc;ng tin n&agrave;y theo quy định ph&aacute;p luật.
          </p>
        </li>
        <li dir="ltr">
          <p dir="ltr">
            Bạn c&oacute; quyền sở hữu trọn đời c&aacute;c kh&oacute;a học
            đ&atilde; đăng k&yacute;.
          </p>
        </li>
        <li dir="ltr">
          <p dir="ltr">
            Bạn kh&ocirc;ng được download tài liệu của hệ thống, kh&ocirc;ng
            được chia sẻ l&ecirc;n Internet với bất kỳ h&igrave;nh thức
            n&agrave;o. Nếu vi phạm, t&agrave;i khoản của bạn sẽ bị kho&aacute;
            v&agrave; bạn phải chịu tr&aacute;ch nhiệm trước ph&aacute;p luật về
            h&agrave;nh vi x&acirc;m phạm sở hữu tr&iacute; tuệ.
          </p>
        </li>
        <li dir="ltr">
          <p dir="ltr">
            Mismart c&oacute; thể gửi th&ocirc;ng b&aacute;o t&igrave;nh
            h&igrave;nh học tập, chương tr&igrave;nh khuyến m&atilde;i (nếu
            c&oacute;), th&ocirc;ng b&aacute;o kh&oacute;a học mới sắp ra mắt để
            học vi&ecirc;n quan t&acirc;m c&oacute; thể đăng k&yacute; ngay để
            được ưu đ&atilde;i. Nếu bạn kh&ocirc;ng muốn nhận email c&oacute;
            thể bấm v&agrave;o link &quot;Ngừng nhận email&quot; ở cuối email.
          </p>
        </li>
      </ul>

      <h3 dir="ltr">
        <strong>
          Điều 3: Đ&aacute;nh gi&aacute; kh&oacute;a học v&agrave; thảo luận
        </strong>
      </h3>

      <ul dir="ltr">
        <li dir="ltr">
          Học vi&ecirc;n khi tham gia kh&oacute;a học tr&ecirc;n Mismart
          c&oacute; quyền đ&aacute;nh gi&aacute; về chất lượng kh&oacute;a học.
        </li>
      </ul>

      <h3 dir="ltr">
        <strong>
          Điều 4: Nghi&ecirc;m cấm sử dụng dịch vụ với c&aacute;c h&agrave;nh vi
          dưới đ&acirc;y
        </strong>
      </h3>

      <ul>
        <li dir="ltr">
          <p dir="ltr">
            Sử dụng bất kỳ c&ocirc;ng cụ hay h&igrave;nh thức n&agrave;o để can
            thiệp v&agrave;o c&aacute;c dịch vụ, kh&oacute;a học trong hệ thống
            Mismart.
          </p>
        </li>
        <li dir="ltr">
          <p dir="ltr">
            Ph&aacute;t t&aacute;n hoặc tuy&ecirc;n truyền cổ vũ c&aacute;c hoạt
            động ph&aacute;t t&aacute;n, can thiệp v&agrave; ph&aacute; hoại nội
            dung c&aacute;c b&agrave;i học tr&ecirc;n hệ thống của Mismart ra
            b&ecirc;n ngo&agrave;i. Mọi vi phạm khi bị ph&aacute;t hiện sẽ bị
            x&oacute;a t&agrave;i khoản v&agrave; c&oacute; thể xử l&yacute;
            theo quy định của ph&aacute;p luật về việc vi phạm bản quyền.
          </p>
        </li>
        <li dir="ltr">
          <p dir="ltr">
            Sử dụng chung t&agrave;i khoản: với việc tr&ecirc;n 2 người
            c&ugrave;ng sử dụng chung một t&agrave;i khoản khi bị ph&aacute;t
            hiện sẽ bị x&oacute;a t&agrave;i khoản ngay lập tức.
          </p>
        </li>
        <li dir="ltr">
          <p dir="ltr">
            X&uacute;c phạm, nhạo b&aacute;ng người kh&aacute;c dưới bất kỳ
            h&igrave;nh thức n&agrave;o: ch&ecirc; bai, kỳ thị t&ocirc;n
            gi&aacute;o, giới t&iacute;nh, sắc tộc..
          </p>
        </li>
        <li dir="ltr">
          <p dir="ltr">
            H&agrave;nh vi mạo nhận hay cố &yacute; l&agrave;m người kh&aacute;c
            tưởng lầm m&igrave;nh l&agrave; một người sử dụng kh&aacute;c trong
            hệ thống dịch vụ của Mismart.
          </p>
        </li>
        <li dir="ltr">
          <p dir="ltr">
            B&agrave;n luận về c&aacute;c vấn đề ch&iacute;nh trị, kỳ thị
            t&ocirc;n gi&aacute;o, kỳ thị sắc tộc.
          </p>
        </li>
        <li dir="ltr">
          <p dir="ltr">
            H&agrave;nh vi, th&aacute;i độ l&agrave;m tổn hại đến uy t&iacute;n
            của c&aacute;c sản phẩm, dịch vụ, kh&oacute;a học trong hệ thống
            Mismart dưới bất kỳ h&igrave;nh thức n&agrave;o, phương thức
            n&agrave;o.
          </p>
        </li>
        <li dir="ltr">
          <p dir="ltr">
            Mạo danh Mismart ảnh hưởng đến uy t&iacute;n của Mismart, g&acirc;y
            sự nhầm lẫn cho c&aacute;c học vi&ecirc;n v&agrave; đối t&aacute;c
            theo bất kỳ phương thức n&agrave;o (d&ugrave;ng địa chỉ email,
            t&ecirc;n miền website, fanpage c&oacute; chữ Mismart..)
          </p>
        </li>
        <li dir="ltr">
          Khi ph&aacute;t hiện những h&agrave;nh vi tr&ecirc;n từ t&agrave;i
          khoản của bạn, Mismart c&oacute; quyền tước bỏ mọi quyền lợi
          li&ecirc;n quan đối với t&agrave;i khoản (bao gồm việc kh&oacute;a
          t&agrave;i khoản) hoặc sử dụng những th&ocirc;ng tin m&agrave; bạn
          cung cấp khi đăng k&yacute; t&agrave;i khoản để chuyển cho cơ quan
          chức năng giải quyết theo quy định của ph&aacute;p luật.
        </li>
      </ul>

      <h3 dir="ltr">
        <strong>Điều 5: Trường hợp thanh to&aacute;n tiền thừa</strong>
      </h3>

      <ul dir="ltr">
        <li dir="ltr">
          Tiền thanh to&aacute;n thừa cho kh&oacute;a học được chuyển v&agrave;o
          v&iacute; điện tử trong t&agrave;i khoản Mismart của kh&aacute;ch
          h&agrave;ng để thanh to&aacute;n cho c&aacute;c đơn h&agrave;ng tiếp
          theo.
        </li>
        <li dir="ltr">
          Trường hợp thanh to&aacute;n thừa do lỗi hệ thống của Mismart,
          ch&uacute;ng t&ocirc;i sẽ trả lại tiền thừa hoặc chuyển sang v&iacute;
          điện tử Mismart để thanh to&aacute;n v&agrave;o đơn h&agrave;ng tiếp
          theo (tuỳ theo nguyện vọng của bạn).
        </li>
      </ul>

      <h3 dir="ltr">
        <strong>
          Điều 6: Ch&iacute;nh s&aacute;ch ho&agrave;n trả học ph&iacute;
        </strong>
      </h3>

      <p dir="ltr">
        Học viện Online Mismart lu&ocirc;n mong muốn tạo điều kiện thuận lợi
        nhất cho bạn để học hỏi v&agrave; cập nhật những kiến thức hữu
        &iacute;ch cho c&ocirc;ng việc cũng như đời sống th&ocirc;ng qua
        c&aacute;c kh&oacute;a học chất lượng tr&ecirc;n Mismart.
      </p>

      <p dir="ltr">
        Tuy nhi&ecirc;n, nếu bạn kh&ocirc;ng h&agrave;i l&ograve;ng hoặc nội
        dung kh&oacute;a học kh&ocirc;ng như bạn mong đợi, bạn c&oacute; thể
        y&ecirc;u cầu ho&agrave;n lại học ph&iacute; qua email:{' '}
        <a href={`mailto:${CustomerServiceMail}`}>{CustomerServiceMail}</a>
      </p>

      <p dir="ltr">
        1. Trong v&ograve;ng 7 ng&agrave;y kể từ ng&agrave;y thanh to&aacute;n
      </p>

      <p dir="ltr">2. Học chưa qu&aacute; 30% số b&agrave;i học.</p>

      <p>
        3. Mua kh&oacute;a học v&agrave; thanh to&aacute;n trực tiếp qua
        Mismart, hoặc đại l&yacute; được cấp quyền ph&acirc;n phối kho&aacute;
        học bởi Mismart.
      </p>

      <p>
        Trường hợp kh&ocirc;ng thanh to&aacute;n trực tiếp qua Mismart (mua từ
        Giảng vi&ecirc;n, từ 1 t&agrave;i khoản kh&aacute;c...), Mismart
        kh&ocirc;ng thể ho&agrave;n học ph&iacute;.
      </p>

      <p dir="ltr">Nội dung email đề nghị ho&agrave;n học ph&iacute;:</p>

      <ul dir="ltr">
        <li>Ti&ecirc;u đề email: Y&ecirc;u cầu ho&agrave;n học ph&iacute;</li>
        <li dir="ltr">
          <p dir="ltr">Nội dung email, bạn cần ghi r&otilde;:</p>

          <ul>
            <li dir="ltr">
              <p dir="ltr">Họ v&agrave; t&ecirc;n:</p>
            </li>
            <li dir="ltr">
              <p dir="ltr">Email đăng k&yacute; học:</p>
            </li>
            <li dir="ltr">
              <p dir="ltr">T&ecirc;n kh&oacute;a học:</p>
            </li>
            <li dir="ltr">
              <p dir="ltr">Số tiền học ph&iacute; đ&atilde; nộp:</p>
            </li>
            <li dir="ltr">
              <p dir="ltr">
                C&aacute;ch thức đ&atilde; nộp học ph&iacute;: Chuyển khoản/ ATM
                Online/ Thu tiền tại nh&agrave;.
              </p>
            </li>
            <li dir="ltr">
              <p dir="ltr">
                C&aacute;ch thức bạn muốn nhận lại tiền ho&agrave;n học
                ph&iacute;:
              </p>
            </li>
          </ul>
        </li>
        <li dir="ltr">
          <p dir="ltr">
            Số tiền ho&agrave;n = Số tiền thực nhận về Mismart (sau khi trừ đi
            ph&iacute; tại cổng thanh to&aacute;n)
          </p>
        </li>
        <li dir="ltr">
          <p dir="ltr">
            Thời hạn ho&agrave;n tiền: trong v&ograve;ng 7 ng&agrave;y
            l&agrave;m việc kể từ ng&agrave;y nhận được y&ecirc;u cầu của bạn.
          </p>
        </li>
      </ul>

      <h2 dir="ltr">
        <strong>ĐIỀU KHOẢN ĐỐI VỚI GIẢNG VI&Ecirc;N </strong>
      </h2>

      <h3 dir="ltr">
        <strong>
          Điều 11. Về việc tự b&aacute;n kh&oacute;a học v&agrave; ho&agrave;n
          tiền cho học vi&ecirc;n.
        </strong>
      </h3>

      <ul>
        <li dir="ltr">
          <p dir="ltr">
            Giảng vi&ecirc;n c&oacute; quyền tự b&aacute;n v&agrave; ph&acirc;n
            phối kh&oacute;a học, thu tiền từ học vi&ecirc;n
          </p>
        </li>
        <li dir="ltr">
          <p dir="ltr">
            Giảng vi&ecirc;n c&oacute; tr&aacute;ch nhiệm ho&agrave;n tiền cho
            học vi&ecirc;n trong trường hợp học vi&ecirc;n y&ecirc;u cầu
            ho&agrave;n tiền v&agrave; đ&aacute;p ứng đủ điều kiện trong Điều 6
            nếu Giảng vi&ecirc;n l&agrave; người b&aacute;n v&agrave; tự thu
            tiền học vi&ecirc;n.
          </p>
        </li>
      </ul>

      <h2 dir="ltr">
        <strong>THANH TO&Aacute;N</strong>
      </h2>

      <h3 dir="ltr">
        <strong>
          Điều 13. Thanh to&aacute;n hoa hồng, thưởng v&agrave; thuế thu nhập
        </strong>
      </h3>

      <p dir="ltr">
        Đối T&aacute;c của Mismart sẽ được chia sẻ doanh thu theo thỏa thuận của
        Mismart với Đối T&aacute;c. C&oacute; thể tham khảo th&ecirc;m ở phần
        giới thiệu chương tr&igrave;nh Affiliate v&agrave; Hợp t&aacute;c giảng
        vi&ecirc;n .
      </p>

      <ul>
        <li dir="ltr">
          Doanh thu từ chương tr&igrave;nh đối t&aacute;c sẽ được hạch
          to&aacute;n theo th&aacute;ng v&agrave; chi trả chậm nhất v&agrave;o
          ng&agrave;y 15 của th&aacute;ng kế tiếp (c&oacute; trường hợp trễ do
          hệ thống ng&acirc;n h&agrave;ng hoặc tr&ugrave;ng v&agrave;o
          c&aacute;c ng&agrave;y nghỉ). Hạn mức thanh to&aacute;n: 1.000.000 với
          Giảng vi&ecirc;n. Nếu chưa đủ hạn mức th&igrave; thu nhập sẽ được tự
          động chuyển sang th&aacute;ng tiếp theo.
        </li>

        <li dir="ltr">
          Mismart sẽ khấu trừ thuế thu nhập c&aacute; nh&acirc;n 10% đối với
          doanh thu đối t&aacute;c đạt tr&ecirc;n 2,000,000đ theo quy định của
          nh&agrave; nước .
        </li>
      </ul>

      <h2 dir="ltr">
        <strong>HỦY THỎA THUẬN V&Agrave; CẬP NHẬT ĐIỀU KHOẢN&nbsp;</strong>
      </h2>

      <p dir="ltr">
        <strong>Điều 14. Huỷ thoả thuận hợp t&aacute;c&nbsp;</strong>
      </p>

      <ul>
        <li dir="ltr">
          <p dir="ltr">
            Bất kỳ hoạt động gian lận hay c&aacute;c h&agrave;nh vi vi phạm một
            trong c&aacute;c điều khoản n&oacute;i tr&ecirc;n sẽ dẫn đến việc
            dừng thoả thuận hợp t&aacute;c, hoặc cao hơn l&agrave; kh&oacute;a
            t&agrave;i khoản v&agrave; hủy mọi kết quả đạt được tại Mismart
            m&agrave; kh&ocirc;ng cần th&ocirc;ng b&aacute;o trước.
          </p>
        </li>
      </ul>

      <p>
        <strong>Điều 15. Về việc cập nhật điều khoản</strong>
      </p>

      <p>
        Mismart c&oacute; thể thay đổi, bổ sung hoặc sửa chữa thỏa thuận
        n&agrave;y bất cứ l&uacute;c n&agrave;o nhằm cập nhật những ch&iacute;nh
        s&aacute;ch mới nhất. C&aacute;c cập nhật mới, quan trọng sẽ được
        th&ocirc;ng b&aacute;o v&agrave; gửi email tới c&aacute;c đối t&aacute;c
        li&ecirc;n quan.&nbsp;
      </p>
    </Stack>
  );
}
