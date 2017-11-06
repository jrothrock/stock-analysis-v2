import PropTypes from 'prop-types';
import React from 'react';
import {withRouter } from 'react-router-dom';

class Stock extends React.Component {

  constructor(props) {
    super(props);
    this.state = { ticker: this.props.match.params.stock,
                   stock: {},
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
                this.boom();
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

boom(){

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
            d0 = data[i - 1],
            d1 = data[i],
            d = x0 - d0.date > d1.date - x0 ? d1 : d0;
            focus.attr("transform", "translate(" + d3.mouse(this)[0] + "," + y(Math.round(d.close * 100) / 100) + ")");
            let text = (i > data_length / 3) ? `$${Math.round(d.close * 100) / 100}${(Math.round(d.close * 100) / 100).toString().split('.')[1].length === 1 ? '0' : ''}, ${parseTime(d.date).toISOString().split('T')[0]}` : `${parseTime(d.date).toISOString().split('T')[0]}, $${Math.round(d.close * 100) / 100}${(Math.round(d.close * 100) / 100).toString().split('.')[1].length === 1 ? '0' : ''}`;
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