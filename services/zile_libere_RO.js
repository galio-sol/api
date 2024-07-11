// const axios = require('axios');
// const HtmlTableToTson = require('html-table-to-json');
const { easterCalendar } = require('../data/zile_paste');

const getEasterCalendar = async (calendar) => {
    return calendar;
};

const parseEasterCalendar = (calendar, year) => {
    const separator = /\n+/;
    const table = calendar.split(separator)
        .filter((line) => {
            try {
                return line && line.startsWith(year);
            } catch (error) {
                console.error(error);
            };
            return false;
        })
        .map((line) => {
            const months = ['ianuarie', 'februarie', 'martie', 'aprilie', 'mai', 'iunie', 'iulie', 'august', 'septembrie', 'octombrie', 'noiembrie', 'decembrie'];
            const sep = / *(-|–) */;
            try {
                const date = line.split(sep);
                const year = parseInt(date[0]);
                const day = parseInt(date[2].split(' ')[0]);
                const month = parseInt(months.indexOf(date[2].split(' ')[1]));
                return new Date(year, month, day);
            } catch (error) {
                console.error(error);
            }
        });
    return table[0];
};

const legalBankHolidays = (easterDay) => {
    const easterMonday = new Date(easterDay.getUTCFullYear(), easterDay.getMonth(), easterDay.getDate() + 1);
    const easterFriday = new Date(easterDay.getUTCFullYear(), easterDay.getMonth(), easterDay.getDate() - 2);
    const firstWhitsuntide = new Date(easterDay.getUTCFullYear(), easterDay.getMonth(), easterDay.getDate() + 49);
    const secondWhitsuntide = new Date(easterDay.getUTCFullYear(), easterDay.getMonth(), easterDay.getDate() + 50);
    const year = easterDay.getUTCFullYear();

    const formatCanonical = (date) => date.getFullYear() + '-' + (date.getMonth() + 1).toString().padStart(2, '0') + '-' + date.getDate().toString().padStart(2, '0');

    const legalHolidays = [
        {
            name: 'Anul nou',
            date: `${year}-01-01`
        },
        {
            name: 'Anul nou',
            date: `${year}-01-02`
        },
        {
            name: 'Boboteaza',
            date: `${year}-01-06`
        },
        {
            name: 'Sfântul Ioan Botezătorul',
            date: `${year}-01-07`
        },
        {
            name: 'Ziua Unirii Principatelor Române',
            date: `${year}-01-24`
        },
        {
            name: 'Vinerea Mare',
            date: formatCanonical(easterFriday)
        },
        {
            name: 'Paste ortodox',
            date: formatCanonical(easterDay)
        },
        {
            name: 'Paste ortodox',
            date: formatCanonical(easterMonday)
        },
        {
            name: 'Ziua Muncii',
            date: `${year}-05-01`
        },
        {
            name: 'Ziua Copilului',
            date: `${year}-06-01`
        },
        {
            name: 'Rusalii',
            date: formatCanonical(firstWhitsuntide)
        },
        {
            name: 'Rusalii',
            date: formatCanonical(secondWhitsuntide)
        },
        {
            name: 'Adormirea Maicii Domnului',
            date: `${year}-08-15`
        },
        {
            name: 'Sfântul Andrei',
            date: `${year}-11-30`
        },
        {
            name: 'Ziua Națională a României',
            date: `${year}-12-01`
        },
        {
            name: 'Crăciunul',
            date: `${year}-12-25`
        },
        {
            name: 'Crăciunul',
            date: `${year}-12-26`
        }
    ]
    return legalHolidays.map((holiday) => ({
        ...holiday,
        script: `update t_calendar set IsWorkingDay = 0, SpecialDayName ='${holiday.name}' where ts = '${holiday.date}';`
    }));
};

const getZileLibere = async (year) => {
    const calendar = await getEasterCalendar(easterCalendar)
                        .then((html) => 
                            parseEasterCalendar(html, year)
                        )
                        .then((easterDay) => 
                            legalBankHolidays(easterDay)
                        )
                        .catch((error) => {
                            console.error(error);
                        });
    return calendar;
}

exports.getZileLibere = getZileLibere;