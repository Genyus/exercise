# Sample solution for interview question

## Overview
Write a program, in any language, that will display an ASCII chart given the following data

```
data = {(1, 2), (2, 3), (3, 1), (4, 6), (5, 8)}
```

You should be able to print the surrounding components of the chart and then place an `*` where each data point is specified in the data set. You do not need to print the X and Y legends but that would be helpful. You are given the max x and max y but if you can calculate that it would be helpful.

### Online auction graph display
- x axis is time
- y axis is price
- Title item

Given a two-dimension array, graph the price over time

```
     +-----+-----+-----+-----+-----+-----+
     +                             *     +
     +                                   +
     +                       *           +
  $  +                                   +
     +                                   +
     +           *                       +
     +     *                             +
     +                 *                 +
     +-----+-----+-----+-----+-----+-----+
                   time
```
```
// max x = 5
// max y = 8
// data = {(1, 2), (2, 3), (3, 1), (4, 6), (5, 8)}
```