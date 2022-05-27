
// eslint-disable-next-line no-unused-vars
const moduleBadr = (function () {
    'use strict'
    document.addEventListener('DOMContentLoaded', function () {
        const listimgleague = ['anivia.jpg', 'chogath.jpg', 'draven.jpg', 'ekko.jpg', 'fiora.jpg', 'fizz.jpg', 'jihn.jpg', 'jinx.jpg', 'mundo.jpg', 'shaco.jpg', 'tahm.jpg', 'Veigar.jpg', 'vi.jpg', 'viktor.jpg', 'yasuo.jpg', 'yone.jpg', 'lux.jpg', 'akali.jpg', 'gp.jpg', 'diana.jpg', 'darius.jpg', 'braum.jpg', 'amumu.jpg', 'pyke.jpg', 'morgana.jpg', 'mccree.jpg', 'masteryi.jpg', 'leona.jpg', 'jayce.jpg', 'irelia.jpg', 'heimerdinger.jpg', 'zed.jpg', 'warwick.jpg', 'wukong.jpg', 'tracer.jpg', 'teemo.jpg']

        const gameboard = document.getElementById('gamearea')

        function check (tab, nbr) {
            let validation = true
            for (let index = 0; index < tab.length; index++) {
                if (tab[index] === nbr) {
                    validation = false
                }
            }
            return validation
        }
        function rng (lvl) {
            const temparray = []
            temparray.push(Math.floor((Math.random() * (lvl * lvl)) + 0))
            let temp
            for (let index = 1; index < (lvl * lvl); index++) {
                temp = Math.floor((Math.random() * (lvl * lvl)) + 0)
                if (!check(temparray, temp)) {
                    index--
                } else {
                    temparray.push(temp)
                    console.log(temp)
                }
            }
            return temparray
        }
        let nbpaires
        let nbpoints
        function displaygrid (lvl) {
            nbpaires = 0
            nbpoints = 0
            gameboard.innerHTML = ''
            const dinamicimglist = []
            for (let index = 0; index < (lvl * lvl) / 2; index++) {
                dinamicimglist.push(listimgleague[index])
                dinamicimglist.push(listimgleague[index])
            }

            const listCaseAleatoire = rng(lvl)

            for (let index = 0; index < lvl * lvl; index++) {
                const divElement = document.createElement('div')
                divElement.setAttribute('class', 'flip-container')
                gameboard.appendChild(divElement)
                const divElementflip = document.createElement('div')
                divElementflip.setAttribute('class', 'flipper')
                divElement.appendChild(divElementflip)
                const divElemfront = document.createElement('div')
                divElemfront.setAttribute('class', 'front')
                divElemfront.dataset.number = index
                divElementflip.appendChild(divElemfront)
                const divElemback = document.createElement('div')
                divElemback.setAttribute('class', 'back')
                divElemback.dataset.number = index
                divElementflip.appendChild(divElemback)
            }
            const listback = document.getElementsByClassName('back')
            const listfront = document.getElementsByClassName('front')
            for (let index = 0; index < lvl * lvl; index++) {
                listfront[index].innerHTML = '<img src="images/mark.png" alt="mark" data-number="' + index + '">'
                listback[listCaseAleatoire[index]].innerHTML = '<img src="images/league/' + dinamicimglist[index] + '" alt="' + dinamicimglist[index] + '">'
            }
        }

        const gamestartdetection = 1000
        let timeoutDetection = false
        let imgislocked = false
        let firstTarget
        let secondeTarget
        let img1
        let img2
        const scoreElement = document.querySelector('#score label')
        const nbPaireElement = document.querySelector('#compteur label')
        gameboard.addEventListener('click', function (event) {
            // eslint-disable-next-line no-mixed-operators
            if (play.innerHTML === 'Stop') {
                if (event.target.parentElement.classList.contains('front') && timeoutDetection === false || event.target.parentElement.classList.contains('back') && timeoutDetection === false) {
                    if (imgislocked === false) {
                        firstTarget = event.target

                        img1 = document.getElementsByClassName('back')[firstTarget.dataset.number].firstChild

                        firstTarget.parentElement.parentElement.classList.toggle('flipCard')
                        imgislocked = true
                    } else {
                        secondeTarget = event.target
                        img2 = document.getElementsByClassName('back')[secondeTarget.dataset.number].firstChild
                        secondeTarget.parentElement.parentElement.classList.toggle('flipCard')
                        if (img2.getAttribute('alt') !== img1.getAttribute('alt')) {
                            timeoutDetection = true
                            setTimeout(function () {
                                firstTarget.parentElement.parentElement.classList.toggle('flipCard')
                                secondeTarget.parentElement.parentElement.classList.toggle('flipCard'); timeoutDetection = false
                            }, 1500)
                        } else {
                            nbpaires++
                            nbpoints += 10
                            scoreElement.innerHTML = 'Score : ' + nbpoints
                            nbPaireElement.innerHTML = 'Nombre de paires trouvé : ' + nbpaires
                            setInterval(scoredepreciation, 6000)
                            if (nbpaires === (ValueOfdifficulty * ValueOfdifficulty) / 2) {
                                stopTimer()
                                play.textContent = 'PLAY AGAIN'
                                setTimeout(() => {
                                    alert('YOU WON')
                                }, 1500)

                            }
                        }
                        imgislocked = false
                    }
                    if (firstTarget === secondeTarget && imgislocked === true) {
                        console.log('same img')
                    }
                    if (firstTarget === secondeTarget) {
                        event.target.parentElement.parentElement.classList.toggle('flipCard')
                        imgislocked = !imgislocked
                    }
                }
            }
        })



        const play = document.getElementById('play')
        const showTime = document.getElementById('time')


        let sec = 0
        let min = 0
        let hour = 0
        let clock
        const oldScore = 0
        let newScore = 0
        let toPlay = false
        let ValueOfdifficulty
        play.addEventListener('click', function (event) {


            if (document.getElementsByClassName('difficulty')[0].checked === true) {
                ValueOfdifficulty = document.getElementsByClassName('difficulty')[0].value
                console.log(document.getElementsByClassName('difficulty')[0])
            } else {
                ValueOfdifficulty = document.getElementsByClassName('difficulty')[1].value
                console.log(document.getElementsByClassName('difficulty')[1])
            }
            if (play.textContent === 'Stop') {
                play.textContent = 'Play again'
                toPlay = true
            } else {
                displaygrid(Number(ValueOfdifficulty))
                play.textContent = 'Stop'
                toPlay = false
            }

            timer()
        })

        function updateSec () {

            showTime.innerHTML = '<p>' + hour
                .toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false }) + ' : ' + min.toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false }) + ' :' + sec.toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false }) + '</p>'
            newScore = sec * 10
            sec++

            if (sec >= 60) {
                sec = 0
                min++
            } if (min >= 60) {
                min = 0
                hour++
            }

            timer()
        }
        function scoredepreciation () {
            nbpoints--
        }
        function timer () {
            clock = setTimeout(updateSec, 0 + gamestartdetection)
        }

        function stopTimer(){
            clearTimeout(clock)
        }
    })
})()
