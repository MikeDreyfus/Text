const stages = [
    { name: 'Новый', class: 'new', items: {}},
    { name: 'Переговоры', class: 'talk', items: {}},
    { name: 'Счет выставлен', class: 'payment', items: {}},
    { name: 'Отложена', class: 'put_aside', items: {}},
    { name: 'Проиграна', class: 'lost', items: {}},
    { name: 'Заключена', class: 'concluded', items: {}}
]
const deals = []
const deals_name = ['Крутая сделка', 'Сделка но не очень', 'Провальная сделка', 'Ультра дупер сделка']

function random_number(min, max) {
    let variable = Math.random() * (max - min) + min;
    return Math.round(variable)
}

function random_date(min, max) {
    let variable = Math.random() * (max - min) + min;
    variable = Math.round(variable)
    if (variable < 10) {
        variable = '0' + variable
    }
    return variable;
}

function set_deals(col) {
    for (let inter = 0; inter < col; inter++ ){
        let deal = {
            id: random_number(1000, 5000),
            name: deals_name[random_number(0, deals_name.length - 1)],
            prise: random_number(1000, 200000) + ' руб',
            date: random_date(0, 29) + '.' + random_date(0, 12) + '.' + random_date(2009, 2024) + ' - ' + random_number(0, 23) + '.' + random_number(10,59),
            stage: stages[random_number(0, stages.length - 1)].class,
        }
        deals.push(deal)
    }
}

set_deals(15)

function stage_initialization() {
    $(stages).each(function(index){
        let holder = document.createElement('div');
        $(holder).addClass('wrp');
        holder.innerHTML =  `
            <div class="stage__holder" data-stage="">
                <div class="stage__holder--heading">
                    <span> Стадия </span>
                    <p class="stage__holder--amount">0</p>
                </div>
                <div class="stage__holder--holder">
                    
                </div>
            </div> `
        ;
        $(holder).find('.stage__holder--heading span').text(stages[index].name)
        $(holder).find('.stage__holder').attr('data-stage', stages[index].class)
        $('#stages').append(holder);
    })
}

stage_initialization()

function deals_initialization() {
    $(deals).each(function(index){
        let deal = document.createElement('div');
        $(deal).addClass('wrp');
        deal.innerHTML = `
            <div class="item">
                <h2 class="item--heading">Сделка №</h2>
                <p class="prise"></p>
                <p class="date"></p>
            </div>
        `;
        // $(deal).find('.name').text(deals[index].name)
        $(deal).find('.prise').text(deals[index].prise)
        $(deal).find('.date').text(deals[index].date)
        $(deal).find('.item--heading').text("Сделка №" + deals[index].id)
        $('.stage__holder').filter(function(){
            return $(this).data('stage') == deals[index].stage
        }).find('.stage__holder--holder').append(deal)
        
        // console.log (deals)
    });
}

deals_initialization()

function stage_col() {
    $('.stage__holder .stage__holder--holder').each(function(){
        $(this).parents('.stage__holder').find('.stage__holder--amount').text($(this).find('.item').length)
    })
}

stage_col()



