import Swal from "sweetalert2";

const DisplayMessage = (msgTitle, msgIcon,isButton=false,isTimer=1500,width='250px') => {
    Swal.fire({
      title: `<strong style="font-size: 20px; color: #333;">${msgTitle}</strong>`,
      icon: msgIcon,
      width: width,  
      padding: '15px',
      heightAuto: true,
      timer: isTimer, 
      timerProgressBar: true,
      showConfirmButton: isButton,
      iconColor: '#006400',
      background: '#f9f9f9', 
      position: 'top',  // Changed to top middle
      toast: true, 
      grow: false
    });
  };
export default DisplayMessage;
