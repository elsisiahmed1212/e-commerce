import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useFormik } from 'formik';
import { useMutationcart } from '../Hooks/useMutationcart';
import { cashpayment, onlinepayment } from '../../Apis/payment';
import { ToastContainer, toast } from 'react-toastify';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({cartid}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  let { mutate , data} = useMutationcart(onlinepayment)
  let { mutate:cash , data:datacash} = useMutationcart(cashpayment)
  let [flage,setflage]= React.useState(false)

  function handelsubmit(shippingAddress) {
    if (flage) {
        mutate({cartid,shippingAddress})
    }
    else{
        cash({cartid,shippingAddress})
    }
  }

  if (data?.data?.status === 'success') {
    window.location.href = data?.data?.session?.url;
  }

  
  
  let formik = useFormik({
    initialValues:{
        details: "",
        phone: "",
        city: ""
    },

    onSubmit:handelsubmit
   })

  return (
    <div>
      <Button variant='contained' color='success' sx={{m:'20px'}} onClick={()=>{handleOpen(); setflage(true)}}>Pay Online</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <form className="max-w-sm mx-auto" onSubmit={formik.handleSubmit}>
            <div className="mb-5">
                <label htmlFor="details" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your details</label>
                <input type="text" id="details" onChange={formik.handleChange} value={formik.values.details} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500 dark:shadow-sm-light" placeholder="Details " required/>
            </div>
            <div className="mb-5">
                <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your city</label>
                <input type="text" id="city" onChange={formik.handleChange} value={formik.values.city} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500 dark:shadow-sm-light" required />
            </div>
            <div className="mb-5">
                <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">phone</label>
                <input type="tel" id="phone" onChange={formik.handleChange} value={formik.values.phone} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500 dark:shadow-sm-light" required />
            </div>
            <button type="submit" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">OK</button>
            </form>
        </Box>
      </Modal>
    </div>
  );
}
