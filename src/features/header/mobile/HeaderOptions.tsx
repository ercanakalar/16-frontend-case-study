import { ReactComponent as HomeIcon } from '../../../assets/icons/home.svg';
import { ReactComponent as BasketIcon } from '../../../assets/icons/basket.svg';
import { ReactComponent as ProfileIcon } from '../../../assets/icons/profile-black.svg';
import { ReactComponent as SearchIcon } from '../../../assets/icons/search.svg';
import { useAppDispatch, useAppSelector } from '../../../store/hook';
import { CartState } from '../../../type/cart-type';
import { getTotalCart } from '../../../store/slices/cartSlice';
import { useEffect } from 'react';

const HeaderOptions = (props: { totalProducts: number; toggleBasket: () => void }) => {
  const dispatch = useAppDispatch();

  const totalProducts = useAppSelector((state: { cart: CartState }) => state.cart.totalProducts);
  const cartItems = useAppSelector((state: { cart: CartState }) => state.cart.items);

  useEffect(() => {
    dispatch(getTotalCart());
  }, [dispatch, cartItems]);

  return (
    <div className='fixed md:hidden lmd:hidden lg:hidden xl:hidden 2xl:hidden bottom-0 left-0 w-full bg-white shadow-lg border-t border-gray-200 flex justify-around items-center'>
      <button className='flex flex-col items-center p-4'>
        <HomeIcon className='w-4 h-4' />
      </button>
      <button className='flex flex-col items-center p-4'>
        <SearchIcon className='w-5 h-5' fill='black' />
      </button>
      <button className='flex flex-col items-center p-4' onClick={props.toggleBasket}>
        <div className='relative'>
          <p className='absolute left-2 -top-2 text-xs text-red-600'>{totalProducts}</p>
        </div>
        <BasketIcon className='w-4 h-4' />
      </button>
      <button className='flex flex-col items-center p-4'>
        <ProfileIcon className='w-4 h-4' />
      </button>
    </div>
  );
};

export default HeaderOptions;
