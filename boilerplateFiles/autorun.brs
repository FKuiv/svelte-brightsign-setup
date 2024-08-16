 Sub Main()

msgPort = CreateObject("roMessagePort")


r=CreateObject("roRectangle", 0,0,1920,1080)

is = {
    port: 3000
}
config = {
    inspector_server: is
    brightsign_js_objects_enabled: true
    url: "file:///sd:/index.html"
    mouse_enabled: true
    scrollbar_enabled: true
}


h=CreateObject("roHtmlWidget", r, config)
h.EnableScrollbars(true)
h.Show()


while true
    msg = wait(0, msgPort)
    print "type(msg)=";type(msg)
    if type(msg) = "roHtmlWidgetEvent" then
        eventData = msg.GetData()
        if type(eventData) = "roAssociativeArray" and type(eventData.reason) = "roString" then
            print "reason = ";eventData.reason
            if eventData.reason = "load-error" then
                print "message = ";eventData.message
            endif
        endif
    endif
end while
End Sub