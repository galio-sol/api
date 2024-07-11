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

exports.arrayToCsv = arrayToCsv;