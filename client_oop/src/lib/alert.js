import Swal from "sweetalert2";

class AlertService {
  async success(message) {
    return Swal.fire({
      icon: 'success',
      title: "Success",
      text: message,
    });
  }

  async error(message) {
    return Swal.fire({
      icon: 'error',
      title: "Ups",
      text: message,
    });
  }

  async confirm(message) {
    const result = await Swal.fire({
      icon: 'question',
      title: "Are you sure?",
      text: message,
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes'
    });
    return result.isConfirmed;
  }
}

export const alertService = new AlertService();