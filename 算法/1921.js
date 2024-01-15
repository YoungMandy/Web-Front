/**
 * @param {number[]} dist
 * @param {number[]} speed
 * @return {number}
 */
var eliminateMaximum = function(dist, speed) {
    let failedFlag = false;
    let count = 0;
    let n = dist.length;

    while(!failedFlag && (count < n)){
      shootMonster(dist, speed, n);
      debugger
    }

    function shootMonster(dist,speed,n){
        let roundShoot = false;

        for(let i = 0; i < n; i++){
            if(dist[i] === 'X') continue;

            if(dist[i] === 0){
              failedFlag = true;
              return;
            }
          debugger

            if(!roundShoot  && (dist[i] - speed[i] <= 0)){
                dist[i] = 'X';
                roundShoot = true;
                count++;
            } else{
                dist[i] = dist[i] - speed[i] >= 0 ? dist[i] - speed[i]: 0;
            }      
        }
    }
  console.log(count);
    return count;
};

eliminateMaximum([4,2,3],[2,1,1])

