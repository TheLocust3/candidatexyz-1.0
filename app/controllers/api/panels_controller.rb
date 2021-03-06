class Api::PanelsController < Api::ApiController

    include CandidateXYZ::Concerns::Authenticatable
    before_action :authenticate, only: [ :index, :create, :update, :destroy ]
    before_action :authenticate_campaign_id, only: [ :index, :create, :update, :destroy ]
    before_action :authenticate_user_campaign_id, only: [ :index, :create, :update, :destroy ]

    def index
        render :json => Panel.all
    end

    def show
        render :json => Panel.where(name: params[:name]).first
    end

    def create
        panel = Panel.new(create_params(params))
        panel.elements = params[:elements]
        panel.settings = params[:settings]

        if panel.save
            render :json => panel
        else
            render_errors(panel)
        end
    end

    def update
        panel = Panel.find(params[:id])
        panel.elements = params[:elements]
        panel.settings = params[:settings]

        if panel.update(update_params(params))
            render :json => panel
        else
            render_errors(panel)
        end
    end

    def destroy
        panel = Panel.where( name: params[:name]).first
        panel.destroy

        render_success
    end

    private
    def create_params(params)
        params.permit(:name, :description)
    end

    def update_params(params)
        params.permit(:name, :description)
    end
end
  