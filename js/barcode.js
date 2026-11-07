/* Code 39 barcode (scannable by standard barcode scanners). Supports A-Z 0-9 and "-". */
const C39={'0':'nnnwwnwnn','1':'wnnwnnnnw','2':'nnwwnnnnw','3':'wnwwnnnnn','4':'nnnwwnnnw','5':'wnnwwnnnn','6':'nnwwwnnnn','7':'nnnwnnwnw','8':'wnnwnnwnn','9':'nnwwnnwnn','A':'wnnnnwnnw','P':'nnwnwnnwn','T':'nnnnwnwwn','-':'nwnnnnwnw','*':'nwnnwnwnn'};
function code39(text){
  let x=0,out='';
  for(const ch of '*'+text+'*'){const p=C39[ch];if(!p)continue;
    for(let i=0;i<9;i++){const w=p[i]==='w'?6:2;if(i%2===0)out+='<rect x="'+x+'" y="0" width="'+w+'" height="56"/>';x+=w}
    x+=2}
  return '<svg viewBox="0 0 '+x+' 56" preserveAspectRatio="none" fill="#000" role="img" aria-label="'+text+'">'+out+'</svg>';
}
