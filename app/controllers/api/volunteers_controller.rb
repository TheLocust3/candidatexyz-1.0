class Api::VolunteersController < Api::ApiController

    before_action :authenticate_user!, only: [ :index, :show, :update, :destroy ]

    def index
        if (params[:page_number].nil?)
            render :json => Volunteer.all
        else
            records_per_page = params[:records_per_page].nil? ? 10 : params[:records_per_page].to_i
            render :json => Volunteer.all[(params[:page_number].to_i) * records_per_page, (params[:page_number].to_i + 1) * records_per_page]
        end
    end

    def get_number_of_pages
        records_per_page = params[:records_per_page].nil? ? 10 : params[:records_per_page].to_i
        render :json => (Volunteer.count / records_per_page.to_f).ceil
    end

    def show
        render :json => Volunteer.find(params[:id])
    end

    def create
        volunteer = Volunteer.new(create_params(params))

        if volunteer.save
            render :json => Volunteer.find(volunteer.id)
        else
            render_errors(volunteer)
        end
    end

    def update
        volunteer = Volunteer.find(params[:id])

        if volunteer.update(update_params(params))
            render :json => Volunteer.find(volunteer.id)
        else
            render_errors(volunteer)
        end
    end

    def destroy
        volunteer = Volunteer.find(params[:id])
        volunteer.destroy

        render_success
    end

    private
    def create_params(params)
        params.permit(:email, :home_number, :mobile_number, :first_name, :last_name, :address1, :address2, :zipcode, :city, :state, :help_blurb)
    end

    def update_params(params)
        params.permit(:email, :home_number, :mobile_number, :first_name, :last_name, :address1, :address2, :zipcode, :city, :state, :help_blurb)
    end
  end
  