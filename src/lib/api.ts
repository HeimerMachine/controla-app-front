import axios from "axios";
import Cookies from 'js-cookie';

const api = axios.create({
    baseURL: "http://localhost:3000"
})

api.interceptors.request.use(
    async function (config) {
        const token = Cookies.get('token')
        if(token){
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
        
    },
    async function (error) {
        return Promise.reject(error)
    }
)

interface IncomePayload {
  amount: number;
  description: string;
  date: string;
}

interface ExpensePayload extends IncomePayload {
  category: string;
}

export const createIncome = async (data: IncomePayload) => {
  try {
    const response = await api.post("/finance/create/income", data);
    return response.data;
  } catch (error) {
    checkError(error, console.error, console.error);
  }
};

export const createExpense = async (data: ExpensePayload) => {
  try {
    const response = await api.post("/finance/create/expense", data);
    return response.data;
  } catch (error) {
    checkError(error, console.error, console.error);
  }
};

export const getAllTransactions = async () => {
  try {
    const response = await api.get("/finance/all");
    return response.data;
  } catch (error) {
    checkError(error, console.error, console.error);
  }
};


type CheckErrorCallback = (message: string) => void;

const checkError = (
    error: unknown,
    onAxiosError: CheckErrorCallback,
    onOtherError: CheckErrorCallback
  ) => {
    if (axios.isAxiosError(error)) {
      const message =
        error.response?.data?.message ||
        error.response?.data ||
        'Ocorreu um erro.';
      onAxiosError(message);
    } else if (
      typeof error === 'object' &&
      error !== null &&
      'message' in error
    ) {
      const message = (error as { message: string }).message;
      onOtherError(message);
    } else {
      const message = String(error);
      onOtherError(message);
    }
  };

  export {api, checkError};