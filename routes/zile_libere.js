const express = require('express');
const router = express.Router();
const { getZileLibere } = require('../services/zile_libere_RO');
const { arrayToCsv } = require('../services/arrayToCsv');
const debug = require('debug')('api:zile_libere');

router.get('/:year', async (req, res, next) => {
    const year = req.params.year;
    const fileName = `zile_libere_${year}.csv`;
    
    debug(`Request for year: ${year}`);

    getZileLibere(year)
        .then((zileLibere) =>
            arrayToCsv(zileLibere)
        )
        .then((file) => 
            res.set({
                "Content-Type": 'text/plain',
                "Content-Disposition": `attachment; filename="${fileName}"`
            })
            .status(202)
            .send(file)
        )
        .catch((err) => 
            next(err)
        );
});

module.exports = router;