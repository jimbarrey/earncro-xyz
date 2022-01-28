
/**
 * Timestamp (UTC),Transaction Description,Currency,Amount,To Currency,To Amount,Native Currency,Native Amount,Native Amount (in USD),Transaction Kind
 */

export class Transaction {
    constructor(data) {
        this._timestamp = data[0];
        this.timestamp = new Date(data[0]);

        this.description = data[1];
        this.currency = data[2];
        
        this._amount = data[3];
        this.amount = parseFloat(data[3]);

        this.toCurrency = data[4];

        this._toAmount = data[5];
        this.toAmount = parseFloat(data[5]);

        this.nativeCurrency = data[6];

        this._nativeAmount = data[7];
        this.nativeAmount = parseFloat(data[7]);

        this._nativeAmountInUSD = data[8];
        this.nativeAmountInUSD = parseFloat(data[8]);

        this.transactionKind = data[9];
    }
}

export default function parseCSV(string) {
    const lines = string.trim().split('\n');
    const header = lines[0].split(',');
    const transactions = [];
    for (let i = 1; i < lines.length; i++) {
        const data = lines[i].split(',');
        transactions.push(new Transaction(data));
    }
    return {
        header,
        transactions,
    };
}