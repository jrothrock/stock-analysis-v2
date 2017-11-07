import PropTypes from 'prop-types';
import React from 'react';
import {withRouter } from 'react-router-dom';

class Stock extends React.Component {

  constructor(props) {
    super(props);
    console.log(props);
    this.state = { ticker: this.props.match.params.stock,
                   stock: {},
                   purchase_date: this.props.location.query && this.props.location.query.purchase_date ? this.props.location.query.purchase_date : null,
                   purchase_price: this.props.location.query && this.props.location.query.purchase_price ? this.props.location.query.purchase_price : null,
                   sale_date: this.props.location.query && this.props.location.query.sale_date ? this.props.location.query.sale_date : null,
                   sale_price: this.props.location.query && this.props.location.query.sale_price ? this.props.location.query.sale_price : null,
                   loaded:false 
                 }
    this.updateMessage = props.updateMessage;
    this.getStock();
  }

  getStock(){
     $.ajax({
        url: `${location.origin}/api/v1/stocks/${this.state.ticker}`,
        type: 'GET',
        success: (data) => {
            if(data && data.stock != null){
                this.setState({stock:data.stock, loaded:true})
                clearTimeout(this.state.loading_timeout);
                this.addGraph();
            } else {
                this.updateMessage('danger',`Failed To Retrieve Ticker Data`);
                this.props.history.push('/');
            }
        },
        error: (error) =>{
            console.log(error);
        }
      });
  }

addGraph(){

    let svg = d3.select("svg"),
        margin = {top: 20, right: 20, bottom: 30, left: 50},
        width = +svg.attr("width") - margin.left - margin.right,
        height = +svg.attr("height") - margin.top - margin.bottom,
        g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    let parseTime = d3.timeParse("%Y%m%d");

    let x = d3.scaleTime()
        .rangeRound([0, width]);

    let y = d3.scaleLinear()
        .rangeRound([height, 0]);

    let line = d3.line()
        .x(function(d) { return x(parseTime(d.date)); })
        .y(function(d) { return y(d.close); });

    let div = d3.select("body").append("div")	
        .attr("class", "tooltip")				
        .style("opacity", 0);

    let data = this.state.stock;
    let data_length = this.state.stock.length;
    x.domain(d3.extent(data, function(d) { return parseTime(d.date); }));
    y.domain(d3.extent(data, function(d) { return d.close; }));

    g.append("g")
        .attr("transform", "translate(0," + height + ")")
        .attr("fill", "#fff")
        .call(d3.axisBottom(x))
        .select(".domain")
        .remove();

    g.append("g")
        .call(d3.axisLeft(y))
        .append("text")
        .attr("fill", "#fff")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text("Price ($)");

    g.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("stroke-width", 1.5)
        .attr("d", line);

    let focus = g.append("g")
            .attr("class", "focus")
            .style("display", "none");

        focus.append("line")
            .attr("class", "x-hover-line hover-line")
            .attr("y1", 0)
            .attr("y2", height);

        focus.append("line")
            .attr("class", "y-hover-line hover-line")
            .attr("x1", width)
            .attr("x2", width);

        focus.append("circle")
            .attr("r", 5)
            .attr('fill', "#4283b0");

        focus.append("text")
            .attr("x", 15)
            .attr("dy", ".31em");
        
        let purchase = g.append('g').attr('class', 'focus').style('display','none')
        purchase.append("line")
            .attr("class", "x-hover-line hover-line")
            .attr("y1", 400)
            .attr("y2", height);

        purchase.append("line")
            .attr("class", "y-hover-line hover-line")
            .attr("x1", width)
            .attr("x2", width);

        purchase.append("circle")
            .attr("r", 5)
            .attr('fill', "#31d209");

        purchase.append("text")
            .attr("x", 400 )
            .attr("dy", ".31em");

        let sold = g.append('g').attr('class', 'focus').style('display','none')
        sold.append("line")
            .attr("class", "x-hover-line hover-line")
            .attr("y1", 400)
            .attr("y2", height);

        sold.append("line")
            .attr("class", "y-hover-line hover-line")
            .attr("x1", width)
            .attr("x2", width);

        sold.append("circle")
            .attr("r", 5)
            .attr('fill', "#de1111");

        sold.append("text")
            .attr("x", 400 )
            .attr("dy", ".31em");
        
        let purchase_data = data ,
            purchase_index = purchase_data.map(function(x){return x.date}).indexOf(this.state.purchase_date ? this.state.purchase_date.split('-').join('') : 'doesnt exist');
        if(purchase_index === -1 && this.state.purchase_date){
            let purchase_date = this.state.purchase_date.split('-');
            let date = new Date();
            date.setFullYear(purchase_date[0], purchase_date[1] -1, purchase_date[2]);
            // basically, if the stock purchase/creation was made on a weekend, we need to shift that date to monday.
            let shift = 8 % date.getDay();
            // ternary is used, as monday could be a holiday, so we need to push it another day out.
            purchase_index = purchase_data.map(function(x){return x.date}).indexOf(`${purchase_date[0]}${purchase_date[1]}${parseInt(purchase_date[2])+shift}`) != -1 ? purchase_data.map(function(x){return x.date}).indexOf(`${purchase_date[0]}${purchase_date[1]}${parseInt(purchase_date[2])+shift}`) : purchase_data.map(function(x){return x.date}).indexOf(`${purchase_date[0]}${purchase_date[1]}${parseInt(purchase_date[2])+shift+1}`)
        }
        if(purchase_index != -1){
            console.log(width-((width/purchase_data.length)*purchase_index));
            purchase.style('display',null);
            let x = parseFloat(width-((width/purchase_data.length)*purchase_index));
            let text = (x >= (width * (2/3))) ? `${this.state.purchase_date} ,$${this.state.purchase_price}` : `$${this.state.purchase_price}, ${this.state.purchase_date}`;
            console.log(y(Math.round(this.state.purchase_price * 100) / 100))
            console.log(y(Math.round(purchase_data[purchase_index].close * 100) / 100))
            purchase.attr('transform', `translate(${x},${y(Math.round(this.state.purchase_price * 100) / 100)})`)
            purchase.select('text').text(()=>{return text })
            purchase.select("text").style("direction", (purchase_index > purchase_data.length / 3) ? 'ltr' : 'rtl').attr('x',(purchase_index > purchase_data.length / 3) ? 15 : -15);
        }
    
    let sold_data = data ,
            sold_index = sold_data.map(function(x){return x.date}).indexOf(this.state.sale_date ? this.state.sale_date.split('-').join('') : 'doesnt exist');
        if(sold_index === -1 && this.state.sale_date){
            let sale_date = this.state.sale_date.split('-');
            let date = new Date();
            date.setFullYear(sale_date[0], sale_date[1] -1, sale_date[2]);
            // basically, if the stock purchase/creation was made on a weekend, we need to shift that date to monday.
            let shift = 8 % date.getDay();
            // ternary is used, as monday could be a holiday, so we need to push it another day out.
            sold_index = sold_data.map(function(x){return x.date}).indexOf(`${sale_date[0]}${sale_date[1]}${parseInt(sale_date[2])+shift}`) != -1 ? sold_data.map(function(x){return x.date}).indexOf(`${sale_date[0]}${sale_date[1]}${parseInt(sale_date[2])+shift}`) : sold_data.map(function(x){return x.date}).indexOf(`${sale_date[0]}${sale_date[1]}${parseInt(sale_date[2])+shift+1}`)
        }
        if(sold_index != -1){
            console.log(width-((width/sold_data.length)*sold_index));
            sold.style('display',null);
            let x = parseFloat(width-((width/sold_data.length)*sold_index));
            let text = (x >= (width * (2/3))) ? `${this.state.sale_date} ,$${this.state.sale_price}` : `$${this.state.sale_price}, ${this.state.sale_date}`;
            console.log(y(Math.round(this.state.sale_price * 100) / 100))
            console.log(y(Math.round(sold_data[sold_index].close * 100) / 100))
            sold.attr('transform', `translate(${x},${y(Math.round(this.state.sale_price * 100) / 100)})`)
            sold.select('text').text(()=>{return text })
            sold.select("text").style("direction", (sold_index > sold_data.length / 3) ? 'ltr' : 'rtl').attr('x',(sold_index > sold_data.length / 3) ? 15 : -15);
        }
    svg.append("rect")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
            .attr("class", "overlay")
            .attr("fill-opacity",0)
            .attr("width", width)
            .attr("height", height)
            .on("mouseover", function() { focus.style("display", null); })
            .on("mouseout", function() { focus.style("display", "none"); })
            .on("mousemove", mousemove);
    function mousemove() {
        // 90% of the values work when scrolling with the mouse, but then 10% don't. Will investigate later.
        // I believe this is due to there being no data during the weekends.
            // throwing an if into the map may be enough
        try{
            let x0 = x.invert(d3.mouse(this)[0]),
                x1 = x0.toISOString().split('T')[0].split('-').join(''),
                i = data.map(function(x) {return x.date; }).indexOf(x1.toString()),
                d0 = i > 0 ? data[i - 1] : data[i],
                d1 = data[i],
                d = x0 - d0.date > d1.date - x0 ? d1 : d0,
                text = (i > data_length / 3) ? `$${Math.round(d.close * 100) / 100}${(Math.round(d.close * 100) / 100).toString().split('.')[1].length === 1 ? '0' : ''}, ${parseTime(d.date).toISOString().split('T')[0]}` : `${parseTime(d.date).toISOString().split('T')[0]} ,$${Math.round(d.close * 100) / 100}${(Math.round(d.close * 100) / 100).toString().split('.')[1].length === 1 ? '0' : ''}`;
                focus.attr("transform", "translate(" + d3.mouse(this)[0] + "," + y(Math.round(d.close * 100) / 100) + ")");
                focus.select("text").text(function() { return text});
                focus.select("text").style("direction", (i > data_length / 3) ? 'ltr' : 'rtl').attr('x',(i > data_length / 3) ? 15 : -15);
                focus.select(".x-hover-line").attr("y2", height - y(Math.round(d.close * 100) / 100));
                focus.select(".y-hover-line").attr("x2", width + width);
        } catch(e) {
            
        }
        }
    }


render() {
    let stock = this.state.stock ? (<div>{this.state.stock.purchase}</div>) : (<div></div>)
    let loading = (
          <div className='loading-container' id='loading-stock-container' style={{display:'none'}}>
            <div className='loading'>
                <div className='loading__square'></div>
                <div className='loading__square'></div>
                <div className='loading__square'></div>
                <div className='loading__square'></div>
                <div className='loading__square'></div>
                <div className='loading__square'></div>
                <div className='loading__square'></div>
            </div>
            <h5 style={{color:'white', fontSize:"2.1em"}}>Loading...</h5>
          </div>
          )
    this.state.loading_timeout = setTimeout(()=>{
        $("#loading-stock-container").fadeIn()
    },500)
    if(this.state.loaded){
        $(".loading-container").addClass("fadeout")
        setTimeout(function() {
            $(".loading-container").remove();
        }, 1000);
    }
    return (
      <div>
          <div style={{textAlign:"center",fontSize:"2.3em",padding:"10px"}}>{this.state.ticker}</div>
          {loading}
          <svg id="visualisation" width={window.outerWidth ? window.outerWidth : document.body.getBoundingClientRect().width} height="500"></svg>
      </div>
    );
  }
}

export default withRouter(Stock);