<template>
  <div class="background">
    <div class="content">
      <p>Letzte Aktualisierung: {{ transformed }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    lastEdited: Number
  },
  computed: {
    transformed () {
      const date = new Date(this.lastEdited);
      return date.customFormat('#DD#.#MM#.#YYYY# #hh#:#mm#');
    }
  }
};

// eslint-disable-next-line no-extend-native
Date.prototype.customFormat = function (formatString) {
  let YYYY,
    MMMM,
    M,
    DDDD,
    D,
    hhh,
    h,
    m,
    s,
    ampm,
    dMod;
  const dateObject = this;
  const YY = ((YYYY = dateObject.getFullYear()) + '').slice(-2);
  const MM = (M = dateObject.getMonth() + 1) < 10 ? '0' + M : M;
  const MMM = (MMMM = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ][M - 1]).substring(0, 3);
  const DD = (D = dateObject.getDate()) < 10 ? '0' + D : D;
  const DDD = (DDDD = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ][dateObject.getDay()]).substring(0, 3);
  const th =
    D >= 10 && D <= 20
      ? 'th'
      : (dMod = D % 10) === 1
          ? 'st'
          : dMod === 2
            ? 'nd'
            : dMod === 3
              ? 'rd'
              : 'th';
  formatString = formatString
    .replace('#YYYY#', YYYY)
    .replace('#YY#', YY)
    .replace('#MMMM#', MMMM)
    .replace('#MMM#', MMM)
    .replace('#MM#', MM)
    .replace('#M#', M)
    .replace('#DDDD#', DDDD)
    .replace('#DDD#', DDD)
    .replace('#DD#', DD)
    .replace('#D#', D)
    .replace('#th#', th);

  h = hhh = dateObject.getHours();
  if (h === 0) { h = 24; }
  const hh = h < 10 ? '0' + h : h;
  const hhhh = hhh < 10 ? '0' + hhh : hhh;
  const AMPM = (ampm = hhh < 12 ? 'am' : 'pm').toUpperCase();
  const mm = (m = dateObject.getMinutes()) < 10 ? '0' + m : m;
  const ss = (s = dateObject.getSeconds()) < 10 ? '0' + s : s;
  return formatString
    .replace('#hhhh#', hhhh)
    .replace('#hhh#', hhh)
    .replace('#hh#', hh)
    .replace('#h#', h)
    .replace('#mm#', mm)
    .replace('#m#', m)
    .replace('#ss#', ss)
    .replace('#s#', s)
    .replace('#ampm#', ampm)
    .replace('#AMPM#', AMPM);
};
</script>

<style></style>
