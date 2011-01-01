require 'sinatra'
require 'sinatra/flash'
require 'google_weather'
require 'erb'

enable :sessions

get '/' do
  @title = "WillItFreezeTonight.com"
  erb :index
end

post '/weather' do
  begin
    place = params[:place]
    weather = GoogleWeather.new(place)
    today = weather.forecast_conditions[0]
    @low = today.low.to_i
  
    rescue NoMethodError
      if place.downcase == "hell"
        @hell = "Probably not, but if the Cowboys won today... Yes and there is snow too!"
      else
        flash[:warning] = "Either this place doesn't exist or we don't have access to weather info there.  Try searching for a nearby town or zipcode."
        redirect '/'
      end
  end
  erb :weather
end

get '/:city' do
  
end

not_found do
  redirect '/'
end
