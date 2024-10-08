import createApi from '../middlewares/createApi';
import { baseQuery } from '../bases/baseQuery';
import { Product } from '../../type/product-type';
import { setBrands, setModels } from '../slices/productSlice';
import store from '../index';
import { sortOptionsValue } from '../../constants/sortConstant';

export const productService = createApi({
  reducerPath: 'productService',
  baseQuery,
  tagTypes: ['Product'],
  endpoints: (builder) => ({
    getProducts: builder.query<
      Product[],
      {
        sort?: string;
        brands?: string[];
        models?: string[];
      }
    >({
      query: ({ sort = '', brands = [], models = [] }) => {
        let queryString = '?';

        if (sort && sortOptionsValue[sort as keyof typeof sortOptionsValue]) {
          queryString += `&${sortOptionsValue[sort as keyof typeof sortOptionsValue]}`;
        }

        if (brands.length > 0) queryString += `&brand=${brands.join(',')}`;
        if (models.length > 0) queryString += `&model=${models.join(',')}`;

        return {
          url: queryString,
          method: 'GET',
        };
      },
      transformResponse: (response: Product[]) => {
        return response;
      },
      transformErrorResponse: (meta, error) => {
        return {
          error: error?.response?.status,
          message: error?.response?.statusText || 'An error occurred while fetching products.',
        };
      },
    }),
    getFilterProducts: builder.query<Product[], {}>({
      query: () => {
        return {
          url: '/',
          method: 'GET',
        };
      },
      transformResponse: (response: Product[]) => {
        const brands = new Set<string>();
        const models = new Set<string>();

        response.forEach((product) => {
          if (product.brand) brands.add(product.brand);
          if (product.model) models.add(product.model);
        });

        store.dispatch(setBrands(Array.from(brands)));
        store.dispatch(setModels(Array.from(models)));

        return response;
      },
      transformErrorResponse: (response) => {
        return response;
      },
    }),
    getProductById: builder.query<Product, string>({
      query: (id) => {
        return {
          url: `/${id}`,
          method: 'GET',
        };
      },
      transformResponse: (response: Product) => {
        return response;
      },
      transformErrorResponse: (response) => {
        return response;
      },
    }),
  }),
});

export const { useGetProductsQuery, useGetFilterProductsQuery, useGetProductByIdQuery } = productService;

export default productService;
