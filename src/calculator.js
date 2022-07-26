const LunarCalendar = require('lunar-calendar');
const ChineseYear = require('chinese-year');
const lodash = require('lodash');
const { Solar } = require('lunar-javascript');

export default function bazi(groomBday, brideBday, reportDuration) {

    //KVP of Chinese Animal to English Animal mappings
    const chiToEngAnimalMapping = [
        { chi: "子", eng: "rat", chi2: "鼠" },
        { chi: "丑", eng: "ox", chi2: "牛" },
        { chi: "寅", eng: "tiger", chi2: "虎" },
        { chi: "卯", eng: "rabbit", chi2: "兔" },
        { chi: "辰", eng: "dragon", chi2: "龙" },
        { chi: "巳", eng: "snake", chi2: "蛇" },
        { chi: "午", eng: "horse", chi2: "马" },
        { chi: "未", eng: "sheep", chi2: "羊" },
        { chi: "申", eng: "monkey", chi2: "猴" },
        { chi: "酉", eng: "rooster", chi2: "鸡" },
        { chi: "戌", eng: "dog", chi2: "狗" },
        { chi: "亥", eng: "pig", chi2: "猪" },
    ]

    const groomAnimalInChinese = (Solar.fromYmd(groomBday.substring(0,4), groomBday.substring(5,7), groomBday.substring(8,10)).getLunar().toFullString().substring(13, 14));
    const brideAnimalInChinese = (Solar.fromYmd(brideBday.substring(0,4), brideBday.substring(5,7), brideBday.substring(8,10)).getLunar().toFullString().substring(13, 14));

    //Get current month of 2022
    let currentMonth = new Date().getMonth();
    let currentYear = new Date().getFullYear();
    let yearToday = new Date().getFullYear();

    //Get Animal based on Year of Birth
    let groomYearAnimal = chiToEngAnimalMapping.filter(x => {
        return (x.chi2 == groomAnimalInChinese)
    })[0].eng
    let brideYearAnimal = chiToEngAnimalMapping.filter(x => {
        return (x.chi2 == brideAnimalInChinese)
    })[0].eng

    let currentYearAnimal = ChineseYear.getAnimal(yearToday);
    let next1YearAnimal = ChineseYear.getAnimal(yearToday + 1);
    let next2YearAnimal = ChineseYear.getAnimal(yearToday + 2);

    let overallArrayList = [];

    /*
    Populate array for next 2 years
    Currently, only populating this month and next month
    i to be updated to 24 during actual generation
    */

    let generationDuration = reportDuration*12+1
    // console.log(generationDuration)

    for (let i = 0; i < generationDuration; i++) {
        if (currentMonth < 12) {
            const monthGeneration = LunarCalendar.calendar(currentYear, currentMonth + 1, false);
            const filteredData = monthGeneration.monthData.map((x) => {
                const animalYear = chiToEngAnimalMapping.filter((y) => {
                    return y.chi == x.GanZhiYear.substring(1, 2)
                })
                const animalMonth = chiToEngAnimalMapping.filter((y) => {
                    return y.chi == x.GanZhiMonth.substring(1, 2)
                })
                const animalDay = chiToEngAnimalMapping.filter((y) => {
                    return y.chi == x.GanZhiDay.substring(1, 2)
                })
                return {
                    year: x.year,
                    month: x.month,
                    day: x.day,
                    yearAnimal: animalYear[0].eng,
                    monthAnimal: animalMonth[0].eng,
                    dayAnimal: animalDay[0].eng,
                    dayChinese: x.GanZhiDay
                }
            })
            overallArrayList.push(filteredData);
            currentMonth = currentMonth + 1
        } else {
            currentMonth = 0
            currentYear = currentYear + 1
            const monthGeneration = LunarCalendar.calendar(currentYear, currentMonth + 1, false);
            const filteredData = monthGeneration.monthData.map((x) => {
                const animalYear = chiToEngAnimalMapping.filter((y) => {
                    return y.chi == x.GanZhiYear.substring(1, 2)
                })
                const animalMonth = chiToEngAnimalMapping.filter((y) => {
                    return y.chi == x.GanZhiMonth.substring(1, 2)
                })
                const animalDay = chiToEngAnimalMapping.filter((y) => {
                    return y.chi == x.GanZhiDay.substring(1, 2)
                })

                return {
                    year: x.year,
                    month: x.month,
                    day: x.day,
                    yearAnimal: animalYear[0].eng,
                    monthAnimal: animalMonth[0].eng,
                    dayAnimal: animalDay[0].eng,
                    dayChinese: x.GanZhiDay
                }
            })
            overallArrayList.push(filteredData);
            currentMonth = currentMonth + 1
        }
    }

    // console.log(overallArrayList);

    //KVP of animal animal clashes
    let animalAnimalClash = [
        { animal1: "rat", animal2: "horse" }, { animal1: "horse", animal2: "rat" }, { animal1: "ox", animal2: "sheep" }, { animal1: "sheep", animal2: "ox" },
        { animal1: "tiger", animal2: "monkey" }, { animal1: "monkey", animal2: "tiger" }, { animal1: "rabbit", animal2: "rooster" }, { animal1: "rooster", animal2: "rabbit" },
        { animal1: "dragon", animal2: "dog" }, { animal1: "dog", animal2: "dragon" }, { animal1: "snake", animal2: "pig" }, { animal1: "pig", animal2: "snake" }

    ];

    //KVP of 3 killings mapping
    let threeKillings = [
        { killing: "water", animals: ["dragon", "monkey", "rat"], clashes: ["snake", "horse", "sheep"] },
        { killing: "fire", animals: ["dog", "tiger", "horse"], clashes: ["pig", "rat", "ox"] },
        { killing: "wood", animals: ["sheep", "pig", "rabbit"], clashes: ["monkey", "rooster", "dog"] },
        { killing: "metal", animals: ["snake", "ox", "rooster"], clashes: ["tiger", "rabbit", "dragon"] }
    ];

    //Top 10 Ferocious & Big Disaster Days
    let top10 = ["甲辰", "乙巳", "丙申", "丁亥", "戊戌"
        , "己丑", "庚辰", "辛巳", "壬申", "癸亥"]

    //Four Separating Days 
    let fourSeparatingDays = [
        { month: 3, day: 20 }, { month: 6, day: 20 }, { month: 9, day: 22 }, { month: 12, day: 21 }
    ]

    //Four Extinct Days
    let fourExtinctDays = [
        { month: 2, day: 3 }, { month: 5, day: 5 }, { month: 8, day: 8 }, { month: 11, day: 7 }
    ]

    //Year breaker Days - Days (animal) that clash with Year (animal)

    let animalClashCurrentYear = animalAnimalClash.filter((x) => {
        return x.animal1 == currentYearAnimal.toLowerCase();
    })[0].animal2

    let animalClashNextYear = animalAnimalClash.filter((x) => {
        return x.animal1 == next1YearAnimal.toLowerCase();
    })[0].animal2
    let animalClash2YearsLater = animalAnimalClash.filter((x) => {
        return x.animal1 == next2YearAnimal.toLowerCase();
    })[0].animal2

    // console.log(animalClashCurrentYear, animalClashNextYear, animalClash2YearsLater);

    let yearBreakerDays = [];

    for (let i = 0; i < overallArrayList.length; i++) {
        overallArrayList[i].forEach((x) => {
            if (x.year == yearToday && x.dayAnimal == animalClashCurrentYear) {
                yearBreakerDays.push(x);
            } else if (x.year == yearToday + 1 && x.dayAnimal == animalClashNextYear) {
                yearBreakerDays.push(x);
            } else if (x.year == yearToday + 2 && x.dayAnimal == animalClash2YearsLater) {
                yearBreakerDays.push(x);
            }
        })
    }

    // console.log(yearBreakerDays);

    //Month Breaker Days - Days (animals) that clash with month(animal)
    let monthBreakerDays = [];

    for (let i = 0; i < overallArrayList.length; i++) {
        overallArrayList[i].forEach((x) => {
            const objectFind = { animal1: x.monthAnimal, animal2: x.dayAnimal }
            for (let j = 0; j < animalAnimalClash.length; j++) {
                if (lodash.isEqual(objectFind, animalAnimalClash[j])) {
                    monthBreakerDays.push(x);
                }
            }
        })
    }

    // console.log(monthBreakerDays);

    //Three Killing Days (Year) - Remove 3 elements that clash with sign of year

    let currentYearThreeKilling = threeKillings.filter((x) => {
        if (x.animals.includes(currentYearAnimal.toLowerCase())) {
            return x.clashes;
        }
    });//Current Year

    let NextYearThreeKilling = threeKillings.filter((x) => {
        if (x.animals.includes(next1YearAnimal.toLowerCase())) {
            return x.clashes;
        }
    });//Next Year

    let TwoYearThreeKilling = threeKillings.filter((x) => {
        if (x.animals.includes(next2YearAnimal.toLowerCase())) {
            return x.clashes;
        }
    });//Next Year

    let threeKillingsClash = [];

    for (let i = 0; i < overallArrayList.length; i++) {
        overallArrayList[i].forEach((x) => {
            if (x.year == yearToday && currentYearThreeKilling[0].clashes.includes(x.dayAnimal)) {
                threeKillingsClash.push(x);
            } else if (x.year == yearToday + 1 && NextYearThreeKilling[0].clashes.includes(x.dayAnimal)) {
                threeKillingsClash.push(x);
            } else if (x.year == yearToday + 2 && TwoYearThreeKilling[0].clashes.includes(x.dayAnimal)) {
                threeKillingsClash.push(x);
            }
        })
    }

    // console.log(threeKillingsClash);

    //Three Killing Days (Month) - Remove 3 Elements that clash with sign of Month

    let monhtlyThreeKillingDays = [];

    for (let i = 0; i < overallArrayList.length; i++) {
        overallArrayList[i].forEach((x) => {
            for (let j = 0; j < threeKillings.length; j++) {
                if (threeKillings[j].animals.includes(x.monthAnimal)
                    && threeKillings[j].clashes.includes(x.dayAnimal)) {
                    monhtlyThreeKillingDays.push(x);
                }
            }
        })
    }

    // console.log(monhtlyThreeKillingDays);

    //Top 10 Ferocious and Big Disaster Days (KIV)
    // let top10Days = [];

    // for (let i=0; i<overallArrayList.length; i++){
    //     overallArrayList[i].forEach((x)=>{
    //         if (top10.includes(x.dayChinese)){
    //             top10Days.push(x);
    //         }
    //     })
    // }

    // console.log(top10Days)

    //Four Separating Days
    let fourSeparatingDaysArray = [];
    for (let i = 0; i < overallArrayList.length; i++) {
        overallArrayList[i].forEach((x) => {
            const objectCompare = { month: x.month, day: x.day }
            for (let j = 0; j < fourSeparatingDays.length; j++) {
                if (lodash.isEqual(objectCompare, fourSeparatingDays[j])) {
                    fourSeparatingDaysArray.push(x);
                }
            }
        })
    }

    //Four Extinct Days

    let fourExtinctDaysArray = [];
    for (let i = 0; i < overallArrayList.length; i++) {
        overallArrayList[i].forEach((x) => {
            const objectCompare = { month: x.month, day: x.day }
            for (let j = 0; j < fourExtinctDays.length; j++) {
                if (lodash.isEqual(objectCompare, fourExtinctDays[j])) {
                    fourExtinctDaysArray.push(x);
                }
            }
        })
    }

    // console.log(fourExtinctDaysArray);

    //Personal Date Clashes
    //Remove month or day that clashes with Groom's year of birth

    let animalClashingWithGroomYOB = animalAnimalClash.filter((x) => { return x.animal1 == groomYearAnimal.toLowerCase() })[0].animal2;

    let groomPersonalDateClash = [];

    for (let i = 0; i < overallArrayList.length; i++) {
        overallArrayList[i].forEach((x) => {
            if (x.monthAnimalx == animalClashingWithGroomYOB || x.dayAnimal == animalClashingWithGroomYOB) {
                groomPersonalDateClash.push(x);
            }
        })
    }

    // console.log(groomPersonalDateClash);

    //Remove month or day that clashes with Groom's year of birth

    let animalClashingWithBrideYOB = animalAnimalClash.filter((x) => { return x.animal1 == brideYearAnimal.toLowerCase() })[0].animal2;

    let bridePersonalDateClash = [];

    for (let i = 0; i < overallArrayList.length; i++) {
        overallArrayList[i].forEach((x) => {
            if (x.monthAnimal == animalClashingWithBrideYOB || x.dayAnimal == animalClashingWithBrideYOB) {
                bridePersonalDateClash.push(x);
            }
        })
    }

    // console.log(bridePersonalDateClash);

    //Identify if year clashes with either bride or groom

    let threeYearClashes = animalAnimalClash.filter((x) => {
        return (x.animal1 == currentYearAnimal.toLowerCase()) || (x.animal1 == next1YearAnimal.toLowerCase()) || (x.animal1 == next2YearAnimal.toLowerCase())
    })

    for (let i = 0; i < threeYearClashes.length; i++) {
        threeYearClashes[i].year = yearToday + i;
        threeYearClashes[i].clash = false;
        if (threeYearClashes[i].animal1 == animalClashingWithBrideYOB || threeYearClashes[i].animal1 == animalClashingWithGroomYOB) {
            threeYearClashes[i].clash = true;
        }
    }

    // console.log(threeYearClashes)

    //Identify good dates
    //Create array of month to animal mapping of "stable" days & identify stable days
    let stableDaysToMonthsMapping = [
        { monthAnimal: "tiger", animal: "horse" }, { monthAnimal: "rabbit", animal: "sheep" }, { monthAnimal: "dragon", animal: "monkey" }, { monthAnimal: "snake", animal: "rooster" },
        { monthAnimal: "horse", animal: "dog" }, { monthAnimal: "sheep", animal: "pig" }, { monthAnimal: "monkey", animal: "rat" }, { monthAnimal: "rooster", animal: "ox" },
        { monthAnimal: "dog", animal: "tiger" }, { monthAnimal: "pig", animal: "rabbit" }, { monthAnimal: "rat", animal: "dragon" }, { monthAnimal: "ox", animal: "snake" }
    ]

    let stableDays = [];
    for (let i = 0; i < overallArrayList.length; i++) {
        overallArrayList[i].forEach((x) => {
            const comparisonObject = { monthAnimal: x.monthAnimal, animal: x.dayAnimal }
            for (let j = 0; j < stableDaysToMonthsMapping.length; j++) {
                if (lodash.isEqual(comparisonObject, stableDaysToMonthsMapping[j])) {
                    stableDays.push(x);
                }
            }
        })
    }

    // console.log(stableDays);

    //Create array of month to animal mapping of "success" days & identify success days

    let successDaysToMonthsMapping = [
        { monthAnimal: "tiger", animal: "dog" }, { monthAnimal: "rabbit", animal: "pig" }, { monthAnimal: "dragon", animal: "rat" }, { monthAnimal: "snake", animal: "ox" },
        { monthAnimal: "horse", animal: "tiger" }, { monthAnimal: "sheep", animal: "rabbit" }, { monthAnimal: "monkey", animal: "dragon" }, { monthAnimal: "rooster", animal: "snake" },
        { monthAnimal: "dog", animal: "horse" }, { monthAnimal: "pig", animal: "sheep" }, { monthAnimal: "rat", animal: "monkey" }, { monthAnimal: "ox", animal: "rooster" }
    ];

    let successDays = [];
    for (let i = 0; i < overallArrayList.length; i++) {
        overallArrayList[i].forEach((x) => {
            const comparisonObject = { monthAnimal: x.monthAnimal, animal: x.dayAnimal }
            for (let j = 0; j < successDaysToMonthsMapping.length; j++) {
                if (lodash.isEqual(comparisonObject, successDaysToMonthsMapping[j])) {
                    successDays.push(x);
                }
            }
        })
    }

    // console.log(successDays);

    //Create array of month to animal mapping of "open" days & identify open days

    let openDaysToMonthsMapping = [
        { monthAnimal: "tiger", animal: "rat" }, { monthAnimal: "rabbit", animal: "ox" }, { monthAnimal: "dragon", animal: "tiger" }, { monthAnimal: "snake", animal: "rabbit" },
        { monthAnimal: "horse", animal: "dragon" }, { monthAnimal: "sheep", animal: "snake" }, { monthAnimal: "monkey", animal: "horse" }, { monthAnimal: "rooster", animal: "sheep" },
        { monthAnimal: "dog", animal: "monkey" }, { monthAnimal: "pig", animal: "rooster" }, { monthAnimal: "rat", animal: "dog" }, { monthAnimal: "ox", animal: "pig" }
    ];

    let openDays = [];
    for (let i = 0; i < overallArrayList.length; i++) {
        overallArrayList[i].forEach((x) => {
            const comparisonObject = { monthAnimal: x.monthAnimal, animal: x.dayAnimal }
            for (let j = 0; j < openDaysToMonthsMapping.length; j++) {
                if (lodash.isEqual(comparisonObject, openDaysToMonthsMapping[j])) {
                    openDays.push(x);
                }
            }
        })
    }

    // console.log(openDays);

    //Marriage Specific - Identify both Solitary Star and Loneliness Stars in Days
    // Groom - Solitary Star, Bride - Loneliness Star
    let solitaryLonelinessMapping = [
        { year: ["tiger", "rabbit", "dragon"], solitaryStar: "snake", lonelinessStar: "ox" },
        { year: ["snake", "horse", "sheep"], solitaryStar: "monkey", lonelinessStar: "dragon" },
        { year: ["monkey", "rooster", "dog"], solitaryStar: "pig", lonelinessStar: "sheep" },
        { year: ["pig", "rat", "ox"], solitaryStar: "tiger", lonelinessStar: "dog" }
    ];

    let solitaryLonelinessDays = [];
    for (let i = 0; i < overallArrayList.length; i++) {
        overallArrayList[i].forEach((x) => {
            const recordGroom = solitaryLonelinessMapping.filter((y) => {
                return (y.year.includes(groomYearAnimal.toLowerCase()))
            })
            if (x.dayAnimal == recordGroom[0].solitaryStar) {
                solitaryLonelinessDays.push(x);
            }
            const recordBride = solitaryLonelinessMapping.filter((y) => {
                return (y.year.includes(brideYearAnimal.toLowerCase()))
            })
            if (x.dayAnimal == recordBride[0].lonelinessStar) {
                solitaryLonelinessDays.push(x);
            }
        })
    }

    // console.log(solitaryLonelinessDays);

    /*Compile list of final very good days (Success, Stable), 
    final good days (Open), final bad days and final average days*/

    let combinedBadDays = [...yearBreakerDays, ...monthBreakerDays, ...threeKillingsClash,
    ...monhtlyThreeKillingDays, ...fourSeparatingDaysArray, ...fourExtinctDaysArray,
    ...groomPersonalDateClash, ...bridePersonalDateClash, ...solitaryLonelinessDays];

    // console.log(combinedBadDays);

    let combinedBadDaysWithDuplicatesRemoved = [];
    combinedBadDays.forEach((x) => {
        if (!combinedBadDaysWithDuplicatesRemoved.includes(x)) {
            combinedBadDaysWithDuplicatesRemoved.push(x)
        }
    })

    let finalBadDays = combinedBadDaysWithDuplicatesRemoved.sort((a, b) => { return a.year - b.year || a.month - b.month || a.day - b.day });
    // console.log(finalBadDays);

    let combinedVeryGoodDays = [...successDays, ...stableDays];
    let combinedVeryGoodDaysWithDuplicatesRemoved = [];
    combinedVeryGoodDays.forEach((x) => {
        if (!combinedVeryGoodDaysWithDuplicatesRemoved.includes(x)) {
            combinedVeryGoodDaysWithDuplicatesRemoved.push(x)
        }
    })
    let intermediateGoodDays = combinedVeryGoodDaysWithDuplicatesRemoved.sort((a, b) => { return a.year - b.year || a.month - b.month || a.day - b.day });
    // console.log("very good days: ", finalVeryGoodDays);
    let finalVeryGoodDays = [];
    intermediateGoodDays.forEach((x) => {
        if (!finalBadDays.includes(x)) {
            finalVeryGoodDays.push(x);
        }
    })

    // console.log("1", intermediateGoodDays.length);
    // console.log("2", finalVeryGoodDays.length);

    let finalOpenDays = [];
    openDays.forEach((x) => {
        if (!finalBadDays.includes(x)) {
            finalOpenDays.push(x);
        }
    })

    // console.log("open days :", openDays)
    // console.log("Final open days :", finalOpenDays)

    let averageDays = [];
    for (let i = 0; i < overallArrayList.length; i++) {
        overallArrayList[i].forEach((x) => {
            if (!finalBadDays.includes(x) && !finalVeryGoodDays.includes(x) && !finalOpenDays.includes(x)) {
                averageDays.push(x);
            }
        })
    }
    // console.log("average days: ", averageDays);

    // console.log("Only the good days", finalVeryGoodDays);

    // export default {overallArrayList, averageDays, finalOpenDays, finalBadDays, finalVeryGoodDays};
    // module.exports = {
    //     overallArrayList, averageDays, finalOpenDays, finalBadDays, finalVeryGoodDays
    // }

    let finalArrayList = {
        averageDays: averageDays, finalBadDays: finalBadDays, finalOpenDays: finalOpenDays, finalVeryGoodDays: finalVeryGoodDays
    }

    return (
        finalArrayList
    )
}