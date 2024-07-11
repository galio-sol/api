const fs = require('fs');
const { getZileLibere } = require('./services/zile_libere_RO');
const zileLibere2024 = getZileLibere(2024);

const arrayToCsv = (array, lineSeparator = '\n', columnSeparator = ',') => {
    const header = Object.keys(array[0]).join(columnSeparator) + lineSeparator;
    const lines = array.map((item) => 
        Object.values(item)
            .map((_) => _.includes(columnSeparator) ? `"${_}"` : _)
            .join(columnSeparator)
    )
    const body = lines.join(lineSeparator);

    return header + body + lineSeparator;
};

zileLibere2024
    .then((zileLibere) => arrayToCsv(zileLibere))
    .then((csv) => 
        fs.writeFile('zile_libere_2024.csv', csv, { encoding: 'utf8' }, (error) => {
            if (error) {
                console.error(error);
            } else {
                console.log('File saved!');
            }
        }
    ));
