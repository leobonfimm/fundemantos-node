import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'outcome' | 'income';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.transactions.filter(x => x.type === 'income');
    const outcome = this.transactions.filter(x => x.type === 'outcome');

    const somaIncome = income.reduce((acumulator, { value }) => {
      return acumulator + value;
    }, 0);

    const somaOutcome = outcome.reduce((acumulator, { value }) => {
      return acumulator + value;
    }, 0);

    const balance = {
      income: somaIncome,
      outcome: somaOutcome,
      total: somaIncome - somaOutcome,
    };

    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
