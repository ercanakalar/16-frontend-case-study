import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../store/hook';
import { calculateCheckout } from '../../store/slices/cartSlice';

import { CardBase } from '../card/base/CardBase';

import convertCurrencyTr from '../../utils/convertCurrency';

const Checkout = () => {
  const dispatch = useAppDispatch();
  const price = useAppSelector((state: any) => state.cart.totalPrice);

  useEffect(() => {
    dispatch(calculateCheckout());
  }, [dispatch]);

  return (
    <CardBase title='Checkout'>
      <div className='flex flex-col w-full'>
        <div className='relative flex gap-1 w-full items-center'>
          <p className='text-sm font-normal text-center'>Total Price:</p>
          <label className='text- font-normal text-center text-cardPrice'>{convertCurrencyTr(price)}</label>
        </div>
        <div>
          <button className='w-full bg-button text-white rounded-md p-2 mt-4'>Checkout</button>
        </div>
      </div>
    </CardBase>
  );
};

export default Checkout;
