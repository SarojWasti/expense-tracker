import Swal from "sweetalert2";

const DisplayMessage = (msgTitle, msgIcon) => {
    Swal.fire({
      title: `<strong style="font-size: 20px; color: #333;">${msgTitle}</strong>`,
      icon: msgIcon,
      width: '250px',  
      padding: '15px',
      heightAuto: true,
      timer: 1500, 
      timerProgressBar: true,
      showConfirmButton: false,
      iconColor: '#006400',
      background: '#f9f9f9', 
      position: 'top',  // Changed to top middle
      toast: true, 
      grow: false
    });
  };
export default DisplayMessage;
