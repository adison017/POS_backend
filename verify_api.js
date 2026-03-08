
import http from 'http';

const get = (url) => {
    return new Promise((resolve, reject) => {
        http.get(url, (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => {
                try {
                    resolve(JSON.parse(data));
                } catch (e) {
                    resolve(data);
                }
            });
        }).on('error', reject);
    });
};

const run = async () => {
    try {
        console.log('--- Checking Health ---');
        const health = await get('http://localhost:4000/health');
        console.log(health);

        console.log('\n--- Fetching Tables ---');
        const tables = await get('http://localhost:4000/api/tables');
        // console.log(JSON.stringify(tables, null, 2));

        // Find a table to check
        const targetTable = tables.find(t => t.label === 'T1') || tables[0];

        if (targetTable) {
            console.log(`\n--- Fetching Open Order for Table ${targetTable.label} (${targetTable.id}) ---`);
            const order = await get(`http://localhost:4000/api/orders/table/${targetTable.id}/open`);

            if (order) {
                console.log('Order Found:');
                console.log('Order No:', order.order_no);
                console.log('Status:', order.status);
                console.log('Items Count:', order.order_items ? order.order_items.length : 'undefined');
                console.log('Items:', JSON.stringify(order.order_items, null, 2));

                if (!order.order_items || order.order_items.length === 0) {
                    console.log('\n!!! WARNING: Order items are missing or empty. This confirms the issue. !!!');
                } else {
                    console.log('\nAPI seems correct. Items are returned.');
                }

            } else {
                console.log('No open order found for this table. (Status 204 likely returned empty body)');
            }
        } else {
            console.log('No tables found.');
        }

    } catch (err) {
        console.error('Error:', err.message);
    }
};

run();
