import Swal from 'sweetalert2';
import './Alert.css';

const Alert = Swal.mixin({
    customClass: {
        confirmButton: 'alert-button',
        title: 'alert-title',
        popup: 'alert-popup',
        content: 'alert-content',
        icon: 'alert-icon',
        input: 'alert-input',
        inputLabel: 'alert-input-label',
        
        // добавьте здесь другие классы, которые вы хотите настроить
    },
    buttonsStyling: false,
});

export default Alert;