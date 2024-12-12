import Swal from "sweetalert2";

const DisplayMessage = (msgTitle, msgIcon) => {
    Swal.fire({
      title: `<h2 style="font-size: 24px;">${msgTitle}</h2>`,
      icon: msgIcon,
      width: '200px',  
      height: '100px',
      heightAuto: true,  // Maintain automatic height to avoid stretching
      timer: 1000,  // Auto close after 3 seconds
      timerProgressBar: true,
      showConfirmButton: false,  // Hide the "OK" button
      iconColor: '#006400'  // Very dark green (Dark Green in hex)
    });
 };
export default DisplayMessage;
